import { defineConfig } from 'tsdown'


export default defineConfig({
	clean: true,
	entry:  ['src/schema-primitive/index.ts', 'src/schema-resume/index.ts'],
	exports: true,
	format: 'esm',
	outDir: 'dist',
	platform: 'neutral',
	target: 'esnext',
	treeshake: true,
	unbundle: true,

})
