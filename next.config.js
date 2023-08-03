/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: [
      "wallpaperbetter.com",
      "p4.wallpaperbetter.com",
      "res.cloudinary.com",
      "www.pexels.com",
      "pexels.com",
      "i.ibb.co",
      "www.instagram.com",
      "api.openweathermap.org"
    ],
  },
};
