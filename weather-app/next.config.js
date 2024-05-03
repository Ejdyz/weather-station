/** @type {import('next').NextConfig} */

const nextConfig = {
  headers: () => [
    {
      source: '/source',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
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
      source: '/api/status',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    }
  ],
}

module.exports = nextConfig
