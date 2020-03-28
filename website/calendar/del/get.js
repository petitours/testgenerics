import { logger } from "../../../futurModule/utils/express/hooks/logger.js";
import qb from "../../../knex/qb.js";
import { query, params } from "../../../futurModule/utils/express/hooks/parser.js";
import optional from "../../../futurModule/validation/basicRules/optional.js";
import string from "../../../futurModule/validation/basicRules/string/string.js";
import requiredEntity from "../../../futurModule/validation/standardRules/requiredEntity.js";
import { isEntity } from "../../../futurModule/utils/express/hooks/isEntity.js";
import archiveEntity from "../../../futurModule/utils/express/hooks/archiveEntity.js";


const getEventDelete = {
  
  confirmation : [
    optional({defaut : 'false'}),
    string (),
   ] 
}

function delEvent () {
  return async ({ context,request }) => {

    // Si on arrive ici c'est que l'evenement existe (sinon isEntity() a déclenché une erreur 404)

    const {params : {id}, query: { confirmation } } = context

    if (confirmation === "true")  {

      // Marquage de l'evenement comme supprimé
      await qb('t_agenda_evt')
        .where('id_evt', '=', id)
        .update({
          isDelete : true
        })
        .debug(true)
    }
                 
    return {
      ...context,
      deleted : true
    }
  }
}




function htmlRenderer () {
  return async ({ context,response,request }) => {

    // Si on arrive ici c'est que l'evenement existe (sinon isEntity() a déclenché une erreur 404)

    // est ce confirmé
   
    
    // Renvoi du contenu souhaité sous forme de lightbox
    response.render('calendar/del/del.ejs', {
      event : context.params.id ,
      xhr : request.xhr ,
      torefresh : false // pas de rafraichissement de la page à faire en auto 
    });
   
    return context
  }
}


// Export des hooks a executer pour index.js
export const GETdelCalendarHooks = [
  params({id: requiredEntity({qb,table:'t_agenda_evt', id:'id_evt' }) }), // vérifie que l'id correspond a un evenement
  //logger(),
  query(getEventDelete), // recupère la confirmation d'effacement
  //logger(),
  isEntity(), // test si l'evenement existe et déclenche une erreur 404 le cas contraire (en redonnant la main à express avec next())
  archiveEntity ({qb,table:'t_agenda_evt', id:'id_evt' }), // marque 
  //getEvent (), // recupération de l'evenement à effacer
  //logger(),
  htmlRenderer ()
]
