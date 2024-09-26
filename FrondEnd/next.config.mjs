/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'swiperjs.com',
        pathname: '/demos/images/**',
      },
    ],
    domains: ['down-vn.img.susercontent.com', 'deo.shopeemobile.com'],
  },
}

export default nextConfig
