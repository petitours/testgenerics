import { logger } from "../../../futurModule/utils/express/hooks/logger.js";
import qb from "../../../knex/qb.js";
import { params } from "../../../futurModule/utils/express/hooks/parser.js";
import requiredEntity from "../../../futurModule/validation/standardRules/requiredEntity.js";
import { isEntity } from "../../../futurModule/utils/express/hooks/isEntity.js";


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
  params({id: requiredEntity({qb,table:'t_agenda_evt', id:'id_evt' }) }),
  //logger(),
  isEntity(), // test si l'evenement existe et déclenche une erreur 404 le cas contraire (en redonnant la main à express avec next())
  //logger(),
  htmlRenderer ()
]
