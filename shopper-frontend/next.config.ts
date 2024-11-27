import type { NextConfig } from "next";
import { config } from 'dotenv';


config({ path: '../.env' });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.GOOGLE_API_KEY,
  },
};

export default nextConfig;
