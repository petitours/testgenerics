
async function field (promise, [name, parsers]) {
  const { data, errors, fields } = await promise
  const result = { data, errors, fields }

  try {
    const [value] = await parsers.reduce(test, [data[name], { ...fields }])

    result.fields = {
      ...fields,
      ...{
        [name]: value
      }
    }
  } catch (error) {
    result.errors = {
      ...errors,
      ...{
        [name]: error
      }
    }
  }

  return result
}

async function test (promise, rule) {
  const [value, fields] = await promise

  return [
    await rule(value, fields),
    fields
  ]
}

export default async function parse ({ ...parsers }, { ...data }) {
  const { errors, fields } = await Object.entries(parsers)
    .reduce(field, Promise.resolve({
      data,
      errors : {},
      fields : {}
    }))

  if (Object.keys(errors).length) {
    throw Object.assign(new Error('validation errors'), { errors } )
  }

  return fields
}

/*
// Appel du test élémentaire en cours
export function test ([value, fields], rule) {

  return [
    rule(value, fields),
    fields
  ]
}


// Parse un seul rule et chacun de ses tests élémentaires (BasicRule).
function OneRuleParse ({ toParse, errors, fields }, [input, tests]){

    try {
      // Passer l'input en cours au travers de tous ses tests élémentaires
      const [value] = tests.reduce(test, [ toParse[input] , {...fields} ] )

      // Le test s'est bien passé on ajoute  la valeur au contexte que l'on retourne et qui passera dans le reduce suivant
      return{
        toParse ,
        errors ,
        fields : { ...fields , ...{ [input]: value } }
      }

    } catch (error) {
      // au premier echec sur un test pour cet input on arrive ici => ajout de l'erreur au context 
      return{
        toParse ,
        errors : { ...errors , ...{ [input]: error } },
        fields 
      }
    }
  

}


// Execution de tous les tests définis dans l'array rules
export default function parse ({ ...rules }, { ...toParse }) { // en entrée on met des copies des objets pour empécher de les modifier par accident et permettre l'intellisense et forcer que ce soit des objets à l'execution

    // pour chaque entrée du ruleset on execute la liste des basicrules contenus dans l'array associé à l'input 
    const { errors, fields } = Object.entries(rules).reduce(OneRuleParse,{
      toParse,
      errors : {},
      fields : {}
    }) 
 
   // Exception globale si jamais il y a des erreurs
    if (Object.keys(errors).length) {
        throw Object.assign(new Error('validation errors'),  errors )
    }
    
    // Retourne les valeurs si tout a pu se dérouler sans exception !
    return fields
  }
*/
  

