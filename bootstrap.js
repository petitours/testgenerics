import { resolve } from 'path'
import dotenv from 'dotenv'



const path = resolve('.env')

//console.log(path)

export default dotenv.config({ path }).parsed