/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "avatars.githubusercontent.com",
      "k.kakaocdn.net",
    ],
  },
};

module.exports = nextConfig;
