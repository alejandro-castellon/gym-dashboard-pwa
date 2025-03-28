import { NextConfig } from "next";
import withPWA from "next-pwa";

const config = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})({
  reactStrictMode: true,
}) as NextConfig;

export default config;
