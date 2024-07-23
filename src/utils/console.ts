export const customConsole = {
  log: (...args: unknown[]) => console.log('[OFF]', ...args),
  error: (...args: unknown[]) => console.log('[OFF] > [ERROR]', ...args),
}
