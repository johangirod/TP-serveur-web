
import { configDefaults, defineConfig } from 'vitest/config'
export default defineConfig({
    test: {
        forceRerunTriggers: [
            ...configDefaults.forceRerunTriggers,
            "index.ts",
            "index.html",
            "views/**/*",
            "models/**/*",
            "controllers/**/*"
        ]
    }
})