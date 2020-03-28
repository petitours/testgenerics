

// par défaut execute console.log


export function logger ({ handler = console, method = 'log' } = {}) {
  return async function ({ context }) {
    handler[method](context)

    return context
  }
}