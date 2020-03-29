
import qb from "../../../knex/qb.js";
import parsers from "../../../lib/validation/parsers/parsers.js";
import hooks from '../../../lib/express/hooks/hooks.js'


const getEventDelete = {  
  confirmation : [
    parsers.misc.coalesce({coalesce : 'false'}),
    parsers.string.type(),
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
  hooks.request.params({id: parsers.validation.standardRules.requiredEntity({qb,table:'t_agenda_evt', id:'id_evt' }) }), // vérifie que l'id correspond a un evenement
  //hooks.log.logger(),
  hooks.request.query(getEventDelete), // recupère la confirmation d'effacement
  //hooks.log.logger(),
  hooks.knex.isEntity(), // test si l'evenement existe et déclenche une erreur 404 le cas contraire (en redonnant la main à express avec next())
  hooks.knex.archiveEntity({qb,table:'t_agenda_evt', id:'id_evt' }), // marque 
  //getEvent (), // recupération de l'evenement à effacer
  //hooks.log.logger(),
  htmlRenderer ()
]
