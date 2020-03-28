
import db  from '../db.js';         // import de la connexion à la bdd
import toURITemplate from '../lib/uri/toURITemplate.js'
import toRoute from '../lib/uri/toRoute.js'
import TwoDateFromCenter from '../lib/dates/centerDate.js'


// définition du template d'URI
export const uricalendar = toURITemplate('/calendar/{plage}/{year}-{month}-{day}')
export const routecalendar = toRoute(uricalendar)

export function getCalendarDefault(request, response) {

   // console.log(request.query.toto)

  //  request.params = { plage : 55, day: 1, month :1, year:2001 }

    getCalendarPage(request, response)

}

export function getCalendarPage(request, response) {

    const { plage, day, month, year } = request.params

    //console.log({ plage, day, month, year })

    // calcul de la date mini et maxi
    const Twodate = TwoDateFromCenter( new Date(year,month-1,day) , plage )

   

 //  console.log(Twodate)

    const href = uricalendar.expand({
        day: '07',
        month: '02',
        year: '2020',
        plage:'45'
    })

  //  console.log({ uri, route, href })

    let query = "SELECT * FROM `t_agenda_evt` ";

    db.query(query, (err, result) => {

        response.render('calendrier.ejs', {
            title: "Calendrier de la mort qui tue"
            ,bilan: "blablabla"
            ,events: result
            ,dataForTimeline : {
                events :JSON.stringify(result)
            }
            ,xhr : request.xhr 
            ,torefresh : false // pas de rafraichissement de la page à faire en auto
            ,plage : 40
           // ,datecentrale : 
        });

    });
  

}

/*


export function getCalendarPage2(request, response) {

        var emptytab = [ ] ;

            response.render('calendrier.ejs', {
                title: "Calendrier de la mort qui tue"
                ,events: JSON.stringify(emptytab)
                //,events: emptytab
            });

}


// Ajax, renvoi les évenements
export function ajaxEvents(request, response) {
        let query = "SELECT * FROM `t_agenda_evt` "; 

        // execute query
        db.query(query, (err, result) => {
            response.send(JSON.stringify(result))
            //response.send(result)
        });
}



*/
