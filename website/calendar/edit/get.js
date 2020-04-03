import parsers from '../../../lib/generics/parsers/parsers.js'
import knexContext from '../../../lib/knex/knexContext.js'
import hooks from '../../../lib/generics/hooks/hooks.js'

const getEditCalendarRules = {
  id: parsers.myparsers.standardRules.requiredID()
}

function htmlRenderer () {
  return async ({ context, response, request, next }) => {
    // Renvoi du contenu souhaité sous forme de lightbox
    response.render('calendar/edit/edit.ejs', {
      event: context.params.id,
      xhr: request.xhr,
      toRefresh: false // pas de rafraichissement de la page à faire en auto
    })

    return context
  }
}

// Export des hooks a executer pour index.js
export const GETeditCalendarHooks = [
  hooks.request.input.params(getEditCalendarRules),
  // hooks.log.logger(),
  hooks.knex.findEntity({ ...knexContext, table: 't_agenda_evt', id: 'id_event' }), // récupère l'évènement si l'event existe et déclenche une erreur 404 le cas contraire (en redonnant la main à express avec next())
  // hooks.log.logger(),
  htmlRenderer()
]
