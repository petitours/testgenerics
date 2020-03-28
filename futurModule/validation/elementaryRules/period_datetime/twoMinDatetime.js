import minDatetime from "../../basicRules/datetime/minDatetime.js"



export default function twoMinDatetime ({min}) {

  const test = minDatetime({min}) //plus performance de créer le test avant le return (pas une fonction créée a chaque test)
  
  return async value => {

    return  Promise.all( value.map(  await test ) )

       // pas besoin de throw puisque datatime() le fait
  }
}