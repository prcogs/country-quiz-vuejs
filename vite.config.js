import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ _, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd())

  // expose .env as process.env instead of import.meta since jest does not import meta yet
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
        return {
          ...prev,
          [`process.env.${key}`]: `"${val}"`,
        }
    },
    {},
  )
  
  return {
    define: envWithProcessPrefix,
    plugins: [vue()],
    resolve: {
      alias: [
        { find: 'components', replacement: '/src/components' }, 
        { find: 'static', replacement: '/src/static' },
        { find: 'api', replacement: '/src/api' },
      ],
    }
  }
})
