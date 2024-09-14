import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import react from "@astrojs/react";
import dotenv from 'dotenv';
dotenv.config({
  path: `../.env.${process.env.NODE_ENV}`
});


// https://astro.build/config
export default defineConfig({
  site: "https://fundforfound.com",
  integrations: [tailwind({
    applyBaseStyles: false
  }), react(), sitemap(), robotsTxt()]
});