module.exports = {
  baseUrl: 'https://www.goodreturns.in',
  pricePath: '/gold-rates/',
  newsPath: '/news/gold/',
  cities: ['delhi', 'chandigarh', 'patna', 'mumbai', 'lucknow'], // Delhi, Punjab, Bihar, Maharashtra, Uttar Pradesh
  delayMin: 30000, // 30s
  delayMax: 40000, // 40s
  scrapeInterval: '0 */30 * * * *', // Every 30 minutes
};
