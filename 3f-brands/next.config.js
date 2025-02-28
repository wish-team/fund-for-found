process.noDeprecation = true;

// Import the Node.js 'path' module at the top of your config file.
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@nextui-org/react"],
  env: {
    NEXT_PUBLIC_APP_URL:
      process.env.NODE_ENV === "production"
        ? "https://luminous-begonia-6e7d76.netlify.app"
        : "http://localhost:3000",
  },
  webpack: (config, { isServer }) => {
    // Alias punycode to force the use of the installed version.
    config.resolve.alias.punycode = path.resolve(__dirname, "node_modules", "punycode");
    return config;
  },
};

module.exports = nextConfig;
