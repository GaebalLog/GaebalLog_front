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
      "lh3.googleusercontent.com",
      "julietlog.s3.ap-northeast-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
