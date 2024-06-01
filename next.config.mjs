/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    swcMinify: true,
    optimizeFonts: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "vmco-backend-media-files.s3.ap-southeast-2.amazonaws.com",
            },
        ],
    },
  };
  
  export default nextConfig;
  