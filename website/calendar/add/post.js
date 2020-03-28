
import qb from "../../../knex/qb.js";
import { redirector } from "../../../futurModule/utils/express/hooks/redirector.js";
import { calendarEventRules } from "../../../lib/rulesets/calendarEventRules.js";
import { body } from "../../../futurModule/utils/express/hooks/parser.js";
import { logger } from "../../../futurModule/utils/express/hooks/logger.js";

function addEvent () {
    return async ({ context }) => {
      const { body: { content, periode: [start, end] } } = context
  
      await qb('t_agenda_evt')
        .insert({
          content,
          start, // une date qui sera convertie en UTC par monknex
          end // une date qui sera convertie en UTC par monknex
        })
        .debug(true)
  
              
      return {
        ...context,
        location:'/calendar'
      }
    }
}

export const POSTaddCalendarHooks = [
  body(calendarEventRules),
  logger(),
  addEvent(),
  logger(),
  redirector() // context.location
]