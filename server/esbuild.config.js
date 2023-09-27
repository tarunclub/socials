// esbuild.config.js
const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['./src/server.ts'], // Adjust the path to your Express app entry point
    bundle: true,
    outfile: './dist/server.js', // Adjust the output path and filename as needed
    platform: 'node',
    target: 'node14', // Adjust the Node.js version if needed
    external: ['express'], // Specify any external dependencies here
  })
  .catch(() => process.exit(1));
