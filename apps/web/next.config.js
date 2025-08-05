/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure compatibility with React 19
  transpilePackages: ['@repo/ui', '@repo/react'],
};

export default nextConfig;
