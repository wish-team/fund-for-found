process.noDeprecation = true;

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
  // Remove or adjust these if not required:
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/your-subdirectory' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '/your-subdirectory' : '',
};

module.exports = nextConfig;
