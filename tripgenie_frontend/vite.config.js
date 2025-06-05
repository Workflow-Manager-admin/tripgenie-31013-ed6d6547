import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        host: '0.0.0.0',
        allowedHosts: ['vscode-internal-3043-beta.beta01.cloud.kavia.ai'], // ✅ put your domain here
        port: 3000,
        strictPort: true,
        cors: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        watch: {
            usePolling: true
        }
    }
})
