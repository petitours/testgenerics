import { centerFromTwoDate } from '../../../futurModule/dates/centerDate.js'
import parsers from '../../../lib/generics/parsers/parsers.js'
import hooks from '../../../lib/generics/hooks/hooks.js'
import knexContext from '../../../lib/knex/knexContext.js'
import utils from '../../../lib/generics/utils/utils.js'
import format from '@lcf.vs/generics/lib/types/string/format.js'

// /calendar?range=month&date=now       valeur par defaut en l'absence de parametre, affiche le mois en cours
// /calendar?range=year&date=now        affiche l'année en cours
// /calendar?range=week&date=now        affiche la semaine en cours
// /calendar?range=day&date=now         affiche le jour en cours

// /calendar?range=day&date=2020-05-02         affiche le jour indiqué (attetion il faut bien un jour complet)
// /calendar?range=week&date=2020-05-02        affiche la semaine du jour indiqué (attetion il faut bien un jour complet)
// /calendar?range=month&date=2020-05-02       affiche le mois du mois indiqué (si le mois est pas défini ca gueule, s'il y a le jour il est négligé)
// /calendar?range=year&date=2020-05-02       affiche l'année de l'année indiquée (si l'année est pas défini ca gueule, s'il y a le jour ou le mois il sont négligés)

// /calendar?range=25&date=2020-05-02         affiche une page de temps de 25 jours centrée sur la date indiquées


const getCalendarRules = {
  date: parsers.myparsers.standardRules.optionalDateISO({
    value: 'now',
    min: '1900-01-01T00:00',
    max: '2200-01-01T00:00'
  }),
  range: [
    parsers.misc.value({ value: 'month' }),
    utils.myUtils.trace('rangeDefault'),
    parsers.myparsers.combinatedRules.twoDateFromRange(),
    utils.myUtils.trace('rangeTwoDate')
  ]
}

function htmlRenderer () {
  return async ({ context, response, request }) => {
    const { events, query: { date, range, range: { start, end } } } = context

    const classButtonBase = 'btn btn-outline-secondary '
    const classBtDay = (range === 'day') ? classButtonBase + 'active' : classButtonBase
    const classBtWeek = (range === 'week') ? classButtonBase + 'active' : classButtonBase
    const classBtMonth = (range === 'month') ? classButtonBase + 'active' : classButtonBase
    const classBtYear = (range === 'year') ? classButtonBase + 'active' : classButtonBase

    // gestion du active de la case maintenant (demande la date de maintenant en position centrale)

    // Gestion des liens des boutons de range de date
    const dateCentrale = centerFromTwoDate(range) // calcul de la datecentrale de la range affichée
    const hrefBtDay = (date === 'now') ? '/calendar?range=day&date=now' : '/calendar?range=day&date=' + dateCentrale.toISOString()
    const hrefBtWeek = (date === 'now') ? '/calendar?range=week&date=now' : '/calendar?range=week&date=' + dateCentrale.toISOString()
    const hrefBtMonth = (date === 'now') ? '/calendar?range=month&date=now' : '/calendar?range=month&date=' + dateCentrale.toISOString()
    const hrefBtYear = (date === 'now') ? '/calendar?range=year&date=now' : '/calendar?range=year&date=' + dateCentrale.toISOString()

    response.render('calendar/index/index.ejs', {
      title: 'Calendrier du ' + start.toLocaleString() + ' au ' + end.toLocaleString() + ' centré sur ' + dateCentrale.toLocaleString(),
      events: events,
      dataForTimeline: events,

      xhr: request.xhr,
      toRefresh: false, // pas de rafraichissement de la page à faire en auto
      range: range, // la range actuelle
      ClassBtDay: classBtDay,
      ClassBtWeek: classBtWeek,
      ClassBtMonth: classBtMonth,
      ClassBtYear: classBtYear,
      hrefBtDay: hrefBtDay,
      hrefBtWeek: hrefBtWeek,
      hrefBtMonth: hrefBtMonth,
      hrefBtYear: hrefBtYear
      // ,datecentrale :
    })

    return context
  }
}

// Export des hooks à executer pour index.js
export const GetCalendarHomeHooks = [
  hooks.request.input.query(getCalendarRules),
  hooks.log.logger({ format: context => ({ getCalendarQuery: context.context }) }),
  //utils.myUtils.trace('calendarHomeQuery'),
  hooks.myHooks.calendar.events.byPeriod({ ...knexContext, table: 'events' }),
  hooks.log.logger({ format: context => ({ getCalendarByperiod: context.context }) }),
  //utils.myUtils.trace('calendarHomeByPeriod'),
  htmlRenderer()
]
