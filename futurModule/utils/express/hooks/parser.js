import parse from "../../../validation/parse.js"

//parser('body', rules) analyse du request.body (typiquement ce que l'on recoit d'un POST)
//parser('query', rules) analyse du request.query (les parametres d'URL sur un GET)
//parser('params', rules) analyse du request.params (request.params.name   correspond a /URL/:name )
function parser (key, { ...parsers }) {
  return async ({ context, next, request: { [key]: data } }) => {
    try {
      return {
        ...context,
        [key]: await parse(parsers, data)
      }
    } catch (error) {
      next(Object.assign(error, {
        code: key === 'body'
          ? 422
          : 400
      }))
    }
  }
}

export const {
  body = parsers => parser('body', parsers),
  params = parsers => parser('params', parsers),
  query = parsers => parser('query', parsers)
} = {}
