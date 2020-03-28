import requiredText from "../../futurModule/validation/standardRules/requiredText";
import requiredDatetimePeriod from "../../futurModule/validation/standardRules/requiredDatetimePeriod";

// rulesset pour ajout ou edition d'un evenement 
export const calendarEventRules =  {
    content : requiredText({min:4,max:250}),    
    periode : requiredDatetimePeriod({
        separator:' au ',
         min:'1900-01-01T00:00:00' ,
         max :'2200-01-01T00:00:00',
          step : 1 , ecartms:0
        })
}
