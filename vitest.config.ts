import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    // Test environment
    environment: 'node',
    
    // Global test setup
    globals: true,
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/index.ts', // Usually just re-exports
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    
    // Test file patterns
    include: [
      'tests/**/*.{test,spec}.{js,ts}',
      'src/**/*.{test,spec}.{js,ts}',
    ],
    
    // Exclude patterns
    exclude: [
      'node_modules/',
      'dist/',
      '**/*.d.ts',
    ],
    
    // Watch mode
    watch: false,
    
    // Timeout configuration
    testTimeout: 10000,
    hookTimeout: 10000,
    
    // Reporter configuration
    reporter: ['verbose'],
    
    // Retry failed tests
    retry: 0,
    
    // Run tests in sequence for better debugging
    sequence: {
      concurrent: true,
    },
    
    // Pool options
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
      },
    },
    
    // Mock configuration
    clearMocks: true,
    restoreMocks: true,
    
    // Setup files
    setupFiles: [],
    
    // Global setup
    globalSetup: [],
    
    // Benchmark configuration
    benchmark: {
      include: ['**/*.{bench,benchmark}.{js,ts}'],
      exclude: ['node_modules/', 'dist/'],
    },
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/types': resolve(__dirname, './src/types'),
      '@/schemas': resolve(__dirname, './src/schemas'),
      '@/utils': resolve(__dirname, './src/utils'),
      '@/constants': resolve(__dirname, './src/constants'),
    },
  },
  
  // Define global constants
  define: {
    __DEV__: true,
    __TEST__: true,
  },
  
  // Esbuild configuration
  esbuild: {
    target: 'es2022',
  },
})

