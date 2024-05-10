/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = {
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://property-pulse-nu.vercel.app/api/:path*',
        },
      ]
    },
};

export default nextConfig;
