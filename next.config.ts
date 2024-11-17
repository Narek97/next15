import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
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
  async redirects() {
    return [
      {
        source: '/:locale/:path*/',
        destination: '/:locale/:path*/login',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'locale',
            value: '(en|de|fr)',
          },
        ],
      },
      {
        source: '/:path*/',
        destination: '/en/:path*/login',
        permanent: false,
      },
      {
        source: '/authorization/callback',
        has: [
          {
            type: 'query',
            key: 'code',
          },
          {
            type: 'query',
            key: 'state',
          },
        ],
        destination: '/api/auth/callback/mywebpage',
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
