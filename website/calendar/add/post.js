import hooks from '../../../lib/generics/hooks/hooks.js'
import { calendarEventRules } from '../../../lib/generics/rulesets/calendarEventRules.js'
import knexContext from '../../../lib/knex/knexContext.js'

export const POSTaddCalendarHooks = [
  hooks.request.input.query(calendarEventRules),
  // hooks.log.logger(),
  hooks.myhooks.calendar.events.addEvent({ ...knexContext, table: 't_agenda_evt' }),
  // hooks.log.logger(),
  hooks.myhooks.response.locatedRedirector('/calendar')
]
