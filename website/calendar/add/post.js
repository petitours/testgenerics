
import qb from "../../../knex/qb.js";
import hooks from '../../../lib/express/hooks/hooks.js'
import { calendarEventRules } from "../../../lib/rulesets/calendarEventRules.js";

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
  hooks.request.body(calendarEventRules),
  hooks.log.logger(),
  addEvent(),
  hooks.log.logger(),
  hooks.response.redirector() // context.location
]