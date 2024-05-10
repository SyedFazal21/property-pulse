module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://property-pulse-blond.vercel.app/api/:path*',
          },
        ]
      },
  };
