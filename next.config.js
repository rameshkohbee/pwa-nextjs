/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  // config

  images: {
    domains: ["web-dev.imgix.net", "unsplash.com"],
  },
});
