// if(proccess.evn=="developmnet"){

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   fastRefresh: true,
//   reactStrictMode: true,
//   // Add this if you're using app directory
//   experimental: {
//     reactRefresh: true,
//     appDir: true,
//   },
// };

// module.exports = nextConfig;
// }

// /**
//  * @type {import('next').NextConfig}
//  */
// const nextConfig = {
//   /* config options here */
// }
 
// module.exports = nextConfig





/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["@nextui-org/react"]
}

module.exports = nextConfig;