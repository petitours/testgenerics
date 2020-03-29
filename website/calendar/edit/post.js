import { calendarEventRules } from "../../../lib/rulesets/calendarEventRules.js";
import qb from "../../../knex/qb.js";
import hooks from '../../../lib/express/hooks/hooks.js'
import parsers from "../../../lib/validation/parsers/parsers.js";


function editEvent () {
  return async ({ context }) => {
    const {params : {id}, body: { content, periode: [start, end] } } = context

    await qb('t_agenda_evt')
      .where('id_evt', '=', id)
      .update({
        content,
        start,
        end
      })
     //.debug(true)
            
    return {
      ...context,
      location:'/calendar'
    }
  }
}

export const POSTeditCalendarHooks = [
  hooks.request.params({id: parsers.validation.standardRules.requiredID() }),
  //hooks.log.logger(),
  hooks.request.body(calendarEventRules),
  //hooks.log.logger(),
  editEvent(),
  //hooks.log.logger(),
  hooks.response.redirector() // context.location
]