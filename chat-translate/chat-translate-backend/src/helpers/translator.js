import * as deepl from 'deepl-node'

const authKeyDeepl = process.env.DEEPL_API_KEY
const translator = new deepl.Translator(authKeyDeepl)

export default translator