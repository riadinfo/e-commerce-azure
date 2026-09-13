import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { PRODUCTS, PROMO_CODES } from '../data/products'

const StoreContext = createContext(null)

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const initial = {
  cart: load('azure-cart', []),
  wishlist: load('azure-wishlist', []),
  user: load('azure-user', null),
  orders: load('azure-orders', []),
  promo: load('azure-promo', null),
  products: PRODUCTS,
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_CART': {
      const { product, size, color, qty } = action
      const idx = state.cart.findIndex(
        (i) => i.id === product.id && i.size === size && i.color === color,
      )
      const cart = [...state.cart]
      if (idx >= 0) cart[idx] = { ...cart[idx], qty: cart[idx].qty + qty }
      else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          size,
          color,
          qty,
        })
      }
      return { ...state, cart }
    }
    case 'SET_QTY':
      return {
        ...state,
        cart: state.cart
          .map((i) => (i.id === action.id && i.size === action.size && i.color === action.color ? { ...i, qty: action.qty } : i))
          .filter((i) => i.qty > 0),
      }
    case 'REMOVE_CART':
      return {
        ...state,
        cart: state.cart.filter(
          (i) => !(i.id === action.id && i.size === action.size && i.color === action.color),
        ),
      }
    case 'CLEAR_CART':
      return { ...state, cart: [], promo: null }
    case 'TOGGLE_WISH': {
      const has = state.wishlist.includes(action.id)
      return {
        ...state,
        wishlist: has ? state.wishlist.filter((id) => id !== action.id) : [...state.wishlist, action.id],
      }
    }
    case 'SET_PROMO':
      return { ...state, promo: action.code }
    case 'LOGIN':
      return { ...state, user: action.user }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'PLACE_ORDER':
      return { ...state, orders: [action.order, ...state.orders], cart: [], promo: null }
    case 'ADD_REVIEW': {
      const products = state.products.map((p) => {
        if (p.id !== action.productId) return p
        const reviews = [action.review, ...p.reviews]
        const rating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
        return { ...p, reviews, rating: Number(rating.toFixed(1)), reviewCount: p.reviewCount + 1 }
      })
      return { ...state, products }
    }
    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial)

  useEffect(() => {
    localStorage.setItem('azure-cart', JSON.stringify(state.cart))
    localStorage.setItem('azure-wishlist', JSON.stringify(state.wishlist))
    localStorage.setItem('azure-user', JSON.stringify(state.user))
    localStorage.setItem('azure-orders', JSON.stringify(state.orders))
    localStorage.setItem('azure-promo', JSON.stringify(state.promo))
  }, [state.cart, state.wishlist, state.user, state.orders, state.promo])

  const subtotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0)
  const promoInfo = state.promo ? PROMO_CODES[state.promo] : null
  const discount = promoInfo ? (promoInfo.type === 'percent' ? subtotal * (promoInfo.value / 100) : promoInfo.value) : 0
  const shipping = subtotal - discount >= 2500 || subtotal === 0 ? 0 : 80
  const total = Math.max(0, subtotal - discount + shipping)
  const cartCount = state.cart.reduce((s, i) => s + i.qty, 0)

  const value = useMemo(
    () => ({
      ...state,
      subtotal,
      discount,
      shipping,
      total,
      cartCount,
      promoInfo,
      addToCart: (product, size, color, qty = 1) => dispatch({ type: 'ADD_CART', product, size, color, qty }),
      setQty: (id, size, color, qty) => dispatch({ type: 'SET_QTY', id, size, color, qty }),
      removeFromCart: (id, size, color) => dispatch({ type: 'REMOVE_CART', id, size, color }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      toggleWish: (id) => dispatch({ type: 'TOGGLE_WISH', id }),
      isWished: (id) => state.wishlist.includes(id),
      applyPromo: (code) => {
        const key = code.trim().toUpperCase()
        if (!PROMO_CODES[key]) return false
        dispatch({ type: 'SET_PROMO', code: key })
        return true
      },
      login: (user) => dispatch({ type: 'LOGIN', user }),
      logout: () => dispatch({ type: 'LOGOUT' }),
      placeOrder: (order) => dispatch({ type: 'PLACE_ORDER', order }),
      addReview: (productId, review) => dispatch({ type: 'ADD_REVIEW', productId, review }),
      getProduct: (id) => state.products.find((p) => p.id === id),
    }),
    [state, subtotal, discount, shipping, total, cartCount, promoInfo],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
