const taka = new Intl.NumberFormat('en-BD', { maximumFractionDigits: 0 })
const takaExact = new Intl.NumberFormat('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const money = (n) => `BDT ${taka.format(n)}`
export const moneyExact = (n) => `BDT ${takaExact.format(n)}`
