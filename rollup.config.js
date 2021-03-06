import svelte from "rollup-plugin-svelte";
import resolve from '@rollup/plugin-node-resolve';
import pkg from "./package.json";

const input = "src/RichSelect.svelte";

export default [
  {
    input,
    output: { file: pkg.main, format: "umd", name: "RichSelect" },
    plugins: [svelte(), resolve()],
  },
  {
    input,
    output: { file: pkg.module, format: "es" },
    external: ["svelte/internal"],
    plugins: [svelte()],
  },
];
