
// securised .env parse
import { resolve } from 'path'
import { chdir } from 'process'
import dotenv from 'dotenv'

// resolve() return the absolute path of the current working directory (bootstrap.js absolute path)
// chdir changes the current working directory OF THE NODE PROCESS with bootstrap.js absolute path
chdir(resolve())

// get absolute path of .env
const path = resolve('.env')

// export parsed ENV
export default dotenv.config({ path }).parsed
