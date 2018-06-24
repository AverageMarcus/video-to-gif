importScripts('sw-toolbox.js');
toolbox.precache([
  'index.html',
  'styles/main.css',
  'scripts/gif.js',
  'scripts/gif.worker.js',
  'scripts/main.js',
  'scripts/loading-bar.js'
]);
toolbox.router.get('/*', toolbox.networkFirst, { networkTimeoutSeconds: 3 });
