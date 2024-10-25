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
};

export default withNextIntl(nextConfig);
