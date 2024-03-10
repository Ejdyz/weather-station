/** @type {import('next').NextConfig} */

const nextConfig = {
  headers: () => [
    {
      source: '/',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
    {
      source: '/status',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],
}

module.exports = nextConfig
