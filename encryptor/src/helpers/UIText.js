export default function UITextEncryptor(isEncryptor) {

    const titleMode = isEncryptor ? "Encriptador" : "Desencriptador"   
    const labelMessage = isEncryptor ? "Introduce el mensaje a encriptar" : "Introduce el mensaje encriptado"
    const placeholderMessage = isEncryptor ? "Hello World" : "Kjrvr&dzupk"
    const labelEncrypterKeyTitle = "Clave de Encriptación"
    const placeholderKey = isEncryptor ? "¡Click para generar!" : "Introduzca la clave generada"
    const buttonText = isEncryptor ? "Encriptar" : "Desencriptar"
    
    return {
        titleMode,
        labelMessage,
        placeholderMessage,
        labelEncrypterKeyTitle,
        placeholderKey,
        buttonText
    }
}