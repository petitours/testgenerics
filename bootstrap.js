import './cwd.cjs'
import { resolve } from 'path'
import dotenv from 'dotenv'

dotenv.config({
  path: resolve('.env')
})

/*

// securised .env parse

import './cwd.cjs'
import { resolve } from 'path'
import dotenv from 'dotenv'

// import { chdir } from 'process'


// resolve() return the absolute path of the current working directory (bootstrap.js absolute path)
// chdir changes the current working directory OF THE NODE PROCESS with bootstrap.js absolute path
// chdir(resolve()) // ou importé depuis cwd

// get absolute path of .env
const path = resolve('.env')

const envParsed = dotenv.config({ path }).parsed

//console.log(envParsed)

// export parsed ENV
export default envParsed
*/
