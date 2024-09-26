import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    outExtension: ({ format }) => ({
      js: format === 'cjs' ? '.cjs' : '.mjs',
    }),
    splitting: true,
    noExternal: ['nanoid', 'superjson'],
  },
  {
    entry: {
      superjson: 'src/lib/superjson.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    outExtension: ({ format }) => ({
      js: format === 'cjs' ? '.cjs' : '.mjs',
    }),
    splitting: true,
    noExternal: ['superjson'],
  },
  {
    entry: {
      nanoid: 'src/lib/nanoid.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    outExtension: ({ format }) => ({
      js: format === 'cjs' ? '.cjs' : '.mjs',
    }),
    splitting: true,
    noExternal: ['nanoid'],
  },
]);
