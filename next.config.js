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
