

// ceci a RIEN a voir avec bootstrap la lib CSS !!

/*
import dotenv from 'dotenv'

export default dotenv.config().parsed
*/

/*
import { resolve } from 'path'
import process from 'process'
import dotenv from 'dotenv'

process.chdir(resolve())

export default dotenv.config().parsed
*/
import { resolve } from 'path'
import dotenv from 'dotenv'



const path = resolve('.env')

//console.log(path)

export default dotenv.config({ path }).parsed