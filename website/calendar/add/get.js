import hooks from '../../../lib/express/hooks/hooks.js'


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
  hooks.log.logger(),
  htmlRenderer ()
]
