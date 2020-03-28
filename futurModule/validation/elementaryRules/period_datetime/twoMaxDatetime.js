import maxDatetime from "../../basicRules/datetime/maxDatetime.js"

export default function twoMaxDatetime ({max}) {

  const test = maxDatetime({max}) //plus performance de créer le test avant le return (pas une fonction créée a chaque test)
  
  return async value => {

    return Promise.all( value.map( await test ) )

       // pas besoin de throw puisque datatime() le fait
  }

}