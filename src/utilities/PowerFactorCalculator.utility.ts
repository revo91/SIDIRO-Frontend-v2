export const powerFactorCalculator = (P: number, Q: number) => {
  const result = parseFloat((P / (Math.sqrt(Math.pow(P, 2) + Math.pow(Q, 2)))).toFixed(3))
  if (isNaN(result)) {
    return 0
  }
  else {
    return result
  }
}