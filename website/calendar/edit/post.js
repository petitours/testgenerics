import hooks from '../../../lib/generics/hooks/hooks.js'
import { calendarEventRules } from '../../../lib/generics/rulesets/calendarEventRules.js'
import parsers from '../../../lib/generics/parsers/parsers.js'
import knexContext from '../../../lib/knex/knexContext.js'
import logger from '@lcf.vs/generics/lib/utils/logger.js'

export const POSTeditCalendarHooks = [
  hooks.request.input.params({ id: parsers.myparsers.standardRules.requiredID() }),
  logger(),
  hooks.request.input.body(calendarEventRules),
  logger(),
  hooks.myHooks.calendar.events.editEvent({ ...knexContext, table: 't_agenda_evt' }),
  logger(),
  hooks.response.redirector() // context.location
]
