/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'remss.sd35.bc.ca',
      },
      {
        protocol: 'https',
        hostname: '*.blogspot.com',
      },
      {
        protocol: 'https',
        hostname: 'tiny-giant.net',
      },
      {
        protocol: 'https',
        hostname: '*.mlchc.org',
      },
      {
        protocol: 'https',
        hostname: 'microbenotes.com',
      },
      {
        protocol: 'https',
        hostname: 'hunterdoncardiovascular.com',
      },
      {
        protocol: 'https',
        hostname: 'aceondo.edu.ng',
      },
    ],
  },
}

module.exports = nextConfig
