// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}|192.168.10.141`,
          },
        ],
        destination: '/main/:path*',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: `${process.env.NEXT_PUBLIC_ADMIN_DOMAIN}|192.168.10.141`,
          },
        ],
        destination: '/admin/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
