import parsers from "@lcf.vs/generics/lib/validation/parsers/parsers.js";



// Tente de convertir un array de 2 chaines en array de  2 Datetime
export default function twoDatetime () {

   return async value => {

      return Promise.all( value.map(  parsers.datetime.type() )  )

      // pas besoin de throw puisque datatime() le fait
   }
}

