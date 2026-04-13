import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite 기본 설정만 두고 복잡한 빌드 설정은 나중에 확장해요.
export default defineConfig({
  plugins: [react()],
});