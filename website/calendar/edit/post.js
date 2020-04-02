import hooks from '../../../lib/generics/hooks/hooks.js'
import { calendarEventRules } from '../../../lib/generics/rulesets/calendarEventRules.js'
import parsers from '../../../lib/generics/parsers/parsers.js'
import knexContext from '../../../lib/knex/knexContext.js'

export const POSTeditCalendarHooks = [
  hooks.request.input.params({ id: parsers.myparsers.standardRules.requiredID() }),
  // hooks.log.logger(),
  hooks.request.input.body(calendarEventRules),
  // hooks.log.logger(),
  hooks.myhooks.calendar.events.editEvent({ ...knexContext, table: 't_agenda_evt' }),
  // hooks.log.logger(),
  hooks.response.redirector() // context.location
]
