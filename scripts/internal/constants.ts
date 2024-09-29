import { dirname, join } from 'path';

import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const ROOT = join(__dirname, '../../');
export const PATHS = {
  ROOT,
  PACKAGES: join(ROOT, './packages'),
  EXAMPLES: join(ROOT, './examples'),
} as const;

export const SCRIPTS = {
  DEV: 'vizoai-scripts dev',
  BUILD: 'vizoai-scripts build',
} as const;