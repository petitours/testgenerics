import parsers from '../parsers/parsers.js'

// rulesset pour ajout ou edition d'un evenement
export const calendarEventRules = {
  content: parsers.myparsers.standardRules.requiredText({ minlength: 4, maxlength: 250 }),
  periode: parsers.myparsers.standardRules.requiredDatetimePeriod({
    separator: ' au ',
    min: '1900-01-01T00:00',
    max: '2200-01-01T00:00',
    step: '1',
    ecartms: 0
  })
}
