const pattern = /\{([^}]+)}/g

export default template => template.expression.replace(pattern, (match, name) => `:${name}`)
