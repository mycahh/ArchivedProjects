const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°\'\"\´";

const gronsfeldTabla = [
    "\'\"\´CDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°AB",
    "\'\"\´DEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°ABC",
    "\'\"\´FGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°ABCDE",
    "\'\"\´HIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°ABCDEFG",
    "\'\"\´LMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°ABCDEFGHIJK",
    "\'\"\´NÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°ABCDEFGHIJKLM",
    "\'\"\´RSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°ABCDEFGHIJKLMNÑOPQ",
    "\'\"\´TUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°ABCDEFGHIJKLMNÑOPQRS",
    "\'\"\´XYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°ABCDEFGHIJKLMNÑOPQRSTUVW",
    "\'\"\´CDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789 !#$%&()*+,-./:;<=>?@[\\]^_{|}áéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØ¿¡ß~°AB"
]

const generateValidKey = (message, generatedKey) => {
    const validKey = generatedKey.repeat(message.length)
    return validKey.substring(message.length)
}

export function encryptorMessage(message, key) {
    const messageToEncrypt = Array.from(message)
    const generateKey = generateValidKey(message, key)

    const encryptedMessage = messageToEncrypt.reduce((acc, current, i) => {
        const elementOnAlpha = alphabet.indexOf(current)
        const elementOnKey = generateKey[i]

        return acc + gronsfeldTabla[elementOnKey][elementOnAlpha]
    }, '')

    return encryptedMessage
}

export function desencryptorMessage(encriptedMessage, key) {
    const encryptedMessage = Array.from(encriptedMessage)
    const generateKey = generateValidKey(encriptedMessage, key)

    const descryptedMessage = encryptedMessage.reduce((acc, current, i) => {
        const pos1 = generateKey[i]
        const pos2 = gronsfeldTabla[pos1].indexOf(current)

        return acc + alphabet[pos2]
    }, '') 

    return descryptedMessage
}



console.log(encryptorMessage("Serenade", '38645222'))
console.log(desencryptorMessage("Wy6mwcfg", '38645222'))
