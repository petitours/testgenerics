import required from "../basicRules/required";
import number from "../basicRules/number/number";
import integer from "../basicRules/number/integer";
import positive from "../basicRules/number/positive";
import toEntity from "../basicRules/bdd/toEntity.js";


export default function requiredEntity({qb, table, id}){
  return [
    required(),  
    number(),
    integer(),
    positive(),
    toEntity({qb, table, id})
   ]
}