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
    domains: [
      'down-vn.img.susercontent.com',
      'deo.shopeemobile.com',
      'th.bing.com',
      'img.freepik.com',
      'png.pngtree.com',
      'down-my.img.susercontent.com',
      'honestlyfit.com',
      'image.made-in-china.com',
      'www.thetiip.com',
    ],
  },
}

export default nextConfig
