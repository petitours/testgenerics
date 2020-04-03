import parsers from '../../../lib/generics/parsers/parsers.js'
import hooks from '../../../lib/generics/hooks/hooks.js'
import knexContext from '../../../lib/knex/knexContext.js'

const getEventDelete = {
  confirmation: [
    parsers.misc.value({ defaultValue: 'false' }), // si pas défini on lui donne la valeur false
    parsers.native.boolean.type() // vérifie que c'est bien un booléen
  ]
}

function htmlRenderer () {
  return async ({ context, response, request }) => {
    // Si on arrive ici c'est que l'evenement existe (sinon getEntity() a déclenché une erreur 404)

    // est ce confirmé

    // Renvoi du contenu souhaité sous forme de lightbox
    response.render('calendar/del/del.ejs', {
      event: context.params.id,
      xhr: request.xhr,
      toRefresh: false // pas de rafraichissement de la page à faire en auto
    })

    return context
  }
}

// Export des hooks a executer pour index.js
export const GETdelCalendarHooks = [
  hooks.request.input.params({ id: parsers.myparsers.standardRules.requiredID() }), // vérifie qu'on a bien recu un ID valide
  hooks.log.logger(),
  hooks.request.input.query(getEventDelete), // recupère la confirmation d'effacement (booléen)
  // hooks.log.logger(),
  hooks.knex.findEntity({ ...knexContext, table: 't_agenda_evt', id: 'id_evt' }), // test si l'evenement existe (et le récupère) et déclenche une erreur 404 le cas contraire (en redonnant la main à express avec next())
  hooks.knex.archiveEntity({ ...knexContext, table: 't_agenda_evt', id: 'id_evt' }), // marque
  // hooks.log.logger(),
  htmlRenderer()
]
