import optionalISOdate from "../../../futurModule/validation/standardRules/optionalISOdate.js";
import optional from "../../../futurModule/validation/basicRules/optional.js";
import twoDatefromPlage from "../../../futurModule/validation/combinatedRules/twoDateFromPlage/twoDatefromPlage.js";
import qb from "../../../knex/qb.js";
import { logger } from "../../../futurModule/utils/express/hooks/logger.js";
import { centerFromTwoDate } from "../../../futurModule/dates/centerDate.js";
import { query } from "../../../futurModule/utils/express/hooks/parser.js";
import eventsByPeriod from "../../../lib/hooks/calendar/eventsByPeriod.js";

// /calendar?plage=month&date=now       valeur par defaut en l'absence de parametre, affiche le mois en cours
// /calendar?plage=year&date=now        affiche l'année en cours
// /calendar?plage=week&date=now        affiche la semaine en cours
// /calendar?plage=day&date=now         affiche le jour en cours

// /calendar?plage=day&date=2020-05-02         affiche le jour indiqué (attetion il faut bien un jour complet)
// /calendar?plage=week&date=2020-05-02        affiche la semaine du jour indiqué (attetion il faut bien un jour complet)
// /calendar?plage=month&date=2020-05-02       affiche le mois du mois indiqué (si le mois est pas défini ca gueule, s'il y a le jour il est négligé)
// /calendar?plage=year&date=2020-05-02       affiche l'année de l'année indiquée (si l'année est pas défini ca gueule, s'il y a le jour ou le mois il sont négligés)

// /calendar?plage=25&date=2020-05-02         affiche une page de temps de 25 jours centrée sur la date indiquées


const getCalendarRules = {
  
    date : optionalISOdate( {
        defaut: 'now',
        min:'1900-01-01T00:00:00' ,
        max :'2200-01-01T00:00:00',
    }),
    plage : [
        optional({defaut : 'month'}),
        twoDatefromPlage()
    ]
}

/*
function selectEvents ({ qb, table, archivedAt = 'archivedAt' }) {
    return async ({ context }) => {

      const { query: { plage: {start, end} } } = context

      const events = await qb('t_agenda_evt')
        .whereBetween('start', [ start, end ] )
        .orWhereBetween('end', [ start, end ] )
        //TODO OR (start <= '" + Twodate.start.toISOString() + "' AND end >= '" + Twodate.end.toISOString() + "') \
        .orderBy('start')
        .debug(true)
              
      return {
          ...context,
          events
      }
    }
}*/


function htmlRenderer () {
    return async  ({context, response,request }) => {
        const { events, query: {date,plage,plage: {start, end} } } = context

        const classeoButonBase = "btn btn-outline-secondary "
        const classBtDay = (plage === 'day')? classeoButonBase + "active" : classeoButonBase ;
        const classBtWeek = (plage === 'week')? classeoButonBase + "active" : classeoButonBase ;
        const classBtMonth = (plage === 'month')? classeoButonBase + "active" : classeoButonBase ;
        const classBtYear = (plage === 'year')? classeoButonBase + "active" : classeoButonBase ;

        //gestion du active de la case maintenant (demande la date de maintenant en position centrale)

        // Gestion des liens des boutons de plage de date
        const dateCentrale = centerFromTwoDate(plage) // calcul de la datecentrale de la plage affichée
        const hrefBtDay = (date == "now")? "/calendar?plage=day&date=now"  : "/calendar?plage=day&date=" + dateCentrale.toISOString()
        const hrefBtWeek = (date == "now")? "/calendar?plage=week&date=now" : "/calendar?plage=week&date=" + dateCentrale.toISOString()
        const hrefBtMonth = (date == "now")? "/calendar?plage=month&date=now" : "/calendar?plage=month&date=" + dateCentrale.toISOString()
        const hrefBtYear = (date == "now")? "/calendar?plage=year&date=now" : "/calendar?plage=year&date=" + dateCentrale.toISOString()
     
        response.render('calendar/index/index.ejs', {
            title: "Calendrier du " + start.toLocaleString() + " au " + end.toLocaleString() + " centré sur " + dateCentrale .toLocaleString()
            ,events : events, 
            dataForTimeline : events
            
            ,xhr : request.xhr 
            ,torefresh : false // pas de rafraichissement de la page à faire en auto
            ,plage : plage // la plage actuelle
            ,ClassBtDay : classBtDay
            ,ClassBtWeek : classBtWeek
            ,ClassBtMonth : classBtMonth
            ,ClassBtYear : classBtYear
            ,hrefBtDay : hrefBtDay
            ,hrefBtWeek : hrefBtWeek
            ,hrefBtMonth : hrefBtMonth
            ,hrefBtYear : hrefBtYear
           // ,datecentrale : 
        });
      
      return context
    }
  }
  
  
  // Export des hooks a executer pour index.js
  export const GETcalendarHomeHooks = [
    query(getCalendarRules),
    //logger(),
    eventsByPeriod ({ qb, table:'t_agenda_evt' }),
    logger(),
    //secureDates(),
   //logger(),
    htmlRenderer ()
  ]
  