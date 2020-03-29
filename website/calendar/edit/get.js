
import qb from "../../../knex/qb.js";
import hooks from '../../../lib/express/hooks/hooks.js'
import parsers from "../../../lib/validation/parsers/parsers.js";

const getEditCalendarRules = {
  id: parsers.validation.standardRules.requiredEntity({
    qb,
    table:'t_agenda_evt',
    id:'id_evt'
  }) 
}

function htmlRenderer () {
  return async ({ context,response,request,next }) => {
  
    // Renvoi du contenu souhaité sous forme de lightbox
    response.render('calendar/edit/edit.ejs', {
      event : context.params.id ,
      xhr : request.xhr ,
      torefresh : false // pas de rafraichissement de la page à faire en auto 
    });
   
    return context
  }
}



// Export des hooks a executer pour index.js
export const GETeditCalendarHooks = [
  hooks.request.params(getEditCalendarRules),
  hooks.log.logger(),
  hooks.knex.isEntity(),
  //hooks.log.logger(),
  htmlRenderer ()
]
