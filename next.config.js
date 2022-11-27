/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        
        pathname: '/u/**',
      },
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
}

module.exports = nextConfig
