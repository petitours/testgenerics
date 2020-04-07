import hooks from '../../../lib/generics/hooks/hooks.js'
import { calendarEventRules } from '../../../lib/generics/rulesets/calendarEventRules.js'
import knexContext from '../../../lib/knex/knexContext.js'
import utils from '../../../lib/generics/utils/utils.js'


export const POSTaddCalendarHooks = [
  hooks.request.input.body(calendarEventRules),
  utils.myUtils.trace('calendarHomeQuery'),
  hooks.myHooks.calendar.events.addEvent({ ...knexContext, table: 't_agenda_evt' }),
  utils.myUtils.trace('calendarHomeQuery'),
  hooks.myHooks.response.locatedRedirector('/calendar')
]
