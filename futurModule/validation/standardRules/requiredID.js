

import required from "../basicRules/required";
import number from "../basicRules/number/number";
import integer from "../basicRules/number/integer";
import positive from "../basicRules/number/positive";


export default function requiredID(){
  return [
    required(),  
    number(),
    integer(),
    positive(),
   ]
}