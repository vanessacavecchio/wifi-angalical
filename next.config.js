/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/vanessacavecchio/wifi-angelical/**',
      },
    ],
  },
}

module.exports = nextConfig
