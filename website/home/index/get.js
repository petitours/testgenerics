import { logger } from "../../../futurModule/utils/express/hooks/logger.js";


function htmlRenderer () {
    return async ({context, response , request }) => {
     
        response.render('home/index/index.ejs', {
            title: "Accueil"        
            ,xhr : request.xhr 
            ,torefresh : false // pas de rafraichissement de la page à faire en auto        
        });
      
      return context
    }
  }
  
  
  // Export des hooks a executer pour index.js
  export const GEThome = [
    //logger(),
    htmlRenderer ()
  ]