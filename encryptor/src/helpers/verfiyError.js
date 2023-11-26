export function getMessageLengthError(isEncryptor) {
    return isEncryptor ?
    ('Asegurese de haber llenado todos los campos antes de encriptar.')
    :
    ('Asegurese de haber llenado todos los campos antes de desencriptar.')
}

const ErrorKey = 'Hay un problema con la clave introducida. La clave debe ser menor o igual a la longitud del mensaje y conformado solo por caracteres numericos'

export function verifyError(isEncryptor, inputValue1, inputValue2) {
    let message = ''
    let isError = false
    
    if(inputValue1.length === 0 && inputValue2.length === 0) {
        message = getMessageLengthError(isEncryptor)
        isError = true
    }

    if( isEncryptor && ((inputValue2.length > inputValue1.length) || isNaN(inputValue2))) {
        message = ErrorKey
        isError = true
    }
    
    if(isError) alert(message)
    
    return isError
}