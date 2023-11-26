export function generatePassword(messageToEncrypt) {    
    let password = ''
    const condition = messageToEncrypt.length < 8 ? (messageToEncrypt.length / 2) : 8
    
    for (let i = 0; i < condition; i++) {
        password += Math.floor(Math.random() * 10);
    }
    
    return password
}

//console.log(generatePassword('serenade of water'))
