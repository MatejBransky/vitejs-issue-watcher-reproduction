# Vite.js v2 crashes on Windows 10

Vite.js v2 with template for React+TS occasionally crashes during development. Log with the error after crash:
```
15:53:57 [vite] hmr update /src/App.tsx
node:events:353
      throw er; // Unhandled 'error' event
      ^

Error: EBUSY: resource busy or locked, lstat 'C:\DumpStack.log.tmp'
Emitted 'error' event on FSWatcher instance at:
    at FSWatcher._handleError (C:\Users\bransky\projects\_playground\vitejs-issue-watcher-reproduction\node_modules\vite\dist\node\chunks\dep-055fc131.js:11574:10)
    at ReaddirpStream.NodeFsHandler._boundHandleError (C:\Users\bransky\projects\_playground\vitejs-issue-watcher-reproduction\node_modules\vite\dist\node\chunks\dep-055fc131.js:10070:43)
    at ReaddirpStream.emit (node:events:376:20)
    at emitErrorNT (node:internal/streams/destroy:188:8)
    at emitErrorCloseNT (node:internal/streams/destroy:153:3)
    at processTicksAndRejections (node:internal/process/task_queues:80:21) {
  errno: -4082,
  code: 'EBUSY',
  syscall: 'lstat',
  path: 'C:\\DumpStack.log.tmp'
}
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
