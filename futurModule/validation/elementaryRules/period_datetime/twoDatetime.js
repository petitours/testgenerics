import datetime from "../../basicRules/datetime/datetime.js"



// Tente de convertir un array de 2 chaines en array de  2 Datetime
export default function twoDatetime () {

   return async value => {

      return Promise.all( value.map(  datetime() )  )

      // pas besoin de throw puisque datatime() le fait
   }
}

