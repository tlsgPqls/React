import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
        pathname: "/**",
      },
    ],
    // 👇 Next.js 16 버전 이상에서 외부 이미지 허용을 위해 필수로 선언해야 합니다.
    qualities: [75],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  rewrites: () => {
    return [
      {
        source: "/api/:path*", // http://localhost:3000/api*
        destination: "http://localhost:3001/:path*",
      },
    ];
  },
};

export default nextConfig;
