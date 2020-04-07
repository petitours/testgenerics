import hooks from '../../../lib/generics/hooks/hooks.js'
import utils from '../../../lib/generics/utils/utils.js'


function htmlRenderer () {
  return async ({ context, response, request }) => {
    response.render('calendar/add/add.ejs', {
      xhr: request.xhr,
      toRefresh: false // pas de rafraichissement de la page à faire en auto
    })

    return context
  }
}

// Export des hooks a executer pour index.js

export const GETaddCalendarHooks = [
  utils.myUtils.trace('calendarHomeQuery'),
  htmlRenderer()
]
