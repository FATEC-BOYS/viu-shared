import { defineConfig } from 'tsup'

export default defineConfig({
  // 📁 Arquivo de entrada único
  entry: ['src/index.ts'],
  
  // 📦 Formatos de saída
  format: ['cjs', 'esm'],
  
  // 🧹 Configurações para build LIMPO
  splitting: false,        // ❌ Sem chunks separados
  sourcemap: false,        // ❌ Sem source maps
  dts: false,             // ❌ Sem arquivos .d.ts 
  clean: true,            // ✅ Limpar pasta dist antes do build
  minify: false,          // ❌ Sem minificação (mais legível)
  metafile: false,        // ❌ Sem metafiles
  
  // 📂 Pasta de saída
  outDir: 'dist',
  
  // 📝 Nomes dos arquivos de saída
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs'
    }
  },
  
  // 🎯 Target moderno
  target: 'es2022',
  
  // 📦 Dependências externas (não incluir no bundle)
  external: ['zod'],
  
  // 🏷️ Banner nos arquivos gerados
  banner: {
    js: '// 🚀 VIU Shared Library - Biblioteca TypeScript da Plataforma VIU'
  },
  
  // ⚙️ Configurações do esbuild
  esbuildOptions(options) {
    options.keepNames = true  // Manter nomes das funções para debug
  }
})

