import { calendarEventRules } from "../../../lib/rulesets/calendarEventRules.js";
import qb from "../../../knex/qb.js";
import { params, body } from "../../../futurModule/utils/express/hooks/parser.js";
import { redirector } from "../../../futurModule/utils/express/hooks/redirector.js";
import { logger } from "../../../futurModule/utils/express/hooks/logger.js";
import requiredID from "../../../futurModule/validation/standardRules/requiredID.js";


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
  params({id: requiredID() }),
  logger(),
  body(calendarEventRules),
  //logger(),
  editEvent(),
  //logger(),
  redirector() // context.location
]