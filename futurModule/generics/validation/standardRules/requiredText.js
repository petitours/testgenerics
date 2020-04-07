import parsers from '@lcf.vs/generics/lib/validation/parsers/parsers.js'
import utils from '../../../../lib/generics/utils/utils.js'

export default function requiredText ({ minlength, maxlength }) {
  return [
    parsers.misc.required(),
    utils.myUtils.trace('requiredTextRequired'),
    parsers.w3c.string.type(), // retourne une string si valide
    utils.myUtils.trace('requiredTextType'),
    parsers.w3c.string.minlength({ minlength }),
    utils.myUtils.trace('requiredTextMin'),
    parsers.w3c.string.maxlength({ maxlength }),
    utils.myUtils.trace('requiredTextMax')

  ]
}
