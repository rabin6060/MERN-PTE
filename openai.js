import {OpenAI} from 'openai'
import 'dotenv/config'

const openai = new OpenAI({
    apiKey:process.env.OPENAI_KEY
})

export default openai