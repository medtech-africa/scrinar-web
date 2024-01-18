import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
// const withPWA = require("@ducanh2912/next-pwa").default({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: "public",
  fallbacks: {
    //image: "/static/images/fallback.png",
    // document: "/offline", // if you want to fallback to a custom page rather than /_offline
    // font: '/static/font/fallback.woff2',
    // audio: ...,
    // video: ...,
  },
  workboxOptions: {
    disableDevLogs: true,
  },
  // ... other options you like
});

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
      {
        protocol: 'https',
        hostname: 'play4health.s3.amazonaws.com',
      },
    ],
  },
}

export default withPWA(nextConfig)
