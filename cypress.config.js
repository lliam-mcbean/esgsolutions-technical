import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    e2e: {
      baseUrl: 'http://localhost:5173', // Base URL for your app
      supportFile: false, // Disable support file if not needed
    },
  },
});
