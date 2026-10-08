/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/clickup-reference.html" },
        { source: "/_next/static/:path*", destination: "/assets/clickup-reference/next/:path*" },
        { source: "/_next/data/:buildId/:path*", destination: "/assets/clickup-reference/next-data/:buildId/:path*" },
        { source: "/assets/home_2026/:path*", destination: "/assets/clickup-reference/original/assets/home_2026/:path*" },
        { source: "/assets/v5/:path*", destination: "/assets/clickup-reference/original/assets/v5/:path*" },
        { source: "/assets/fonts/:path*", destination: "/assets/clickup-reference/original/assets/fonts/:path*" },
        { source: "/assets/brand/:path*", destination: "/assets/clickup-reference/original/assets/brand/:path*" },
        { source: "/assets/brain-2/:path*", destination: "/assets/clickup-reference/original/assets/brain-2/:path*" },
        { source: "/assets/images/:path*", destination: "/assets/clickup-reference/original/assets/images/:path*" },
        { source: "/assets/compliance/:path*", destination: "/assets/clickup-reference/original/assets/compliance/:path*" },
        { source: "/assets/v4/:path*", destination: "/assets/clickup-reference/original/assets/v4/:path*" },
        { source: "/assets/icons/:path*", destination: "/assets/clickup-reference/original/assets/icons/:path*" },
        { source: "/icons/:path*", destination: "/assets/clickup-reference/original/icons/:path*" },
        { source: "/favicons/:path*", destination: "/assets/clickup-reference/original/favicons/:path*" },
      ],
    };
  },
};

export default nextConfig;
