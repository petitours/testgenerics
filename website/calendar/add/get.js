import { logger } from "../../../futurModule/utils/express/hooks/logger.js";


function htmlRenderer () {
  return async ({ context,response,request }) => {
   
    response.render('calendar/add/add.ejs', {
      xhr : request.xhr ,
      torefresh : false // pas de rafraichissement de la page à faire en auto  
    });
    
    return context
  }
}


// Export des hooks a executer pour index.js
export const GETaddCalendarHooks = [
  //logger(),
  htmlRenderer ()
]
