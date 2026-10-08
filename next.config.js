const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  env: {
    siteTitle: 'Fridacai',
    siteDescription: 'Explore Fridacai collections and discover your next favourite.',
    siteKeywords: 'Fridacai, collections, shopping',
    siteUrl: 'https://next-shopify-starter-main-kappa.vercel.app',
    siteImagePreviewUrl: '/images/main.jpg',
    twitterHandle: ''
  },
  images: {
    domains: ['cdn.shopify.com'],
  },
})
