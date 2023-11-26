<script>
    import UITextEncryptor from "../helpers/UIText.js"
    import { generatePassword } from "../helpers/generatePassword.js"
    import { verifyError } from "../helpers/verfiyError.js"
    import { encryptorMessage, desencryptorMessage } from "../helpers/Encryptor.js"
    let isEncryptor = true
    let showOutput = false
    const defaultValue = ''
    let valueInput1 = defaultValue
    let valueInput2 = defaultValue
    
    let outputEncryptedMessage = ''
    let outputKeyEncryptor = ''

    $: UIText = UITextEncryptor(isEncryptor)
    const clearInputText = () => {
        valueInput1 = defaultValue
        valueInput2 = defaultValue
    }
    const handleChangeMode = () => {
        isEncryptor = !isEncryptor
        clearInputText()
    }
    const handleButtonGeneratePassword = () => {
        if(valueInput1.length === 0) {
            alert('Se necesita un mensaje para generar la clave de cifrado')
            return
        }
        valueInput2 = generatePassword(valueInput1)
    }

    const handleEncryptorDesencyptor = () => {
        const isError = verifyError(isEncryptor, valueInput1, valueInput2)
        if(isError) return
        outputEncryptedMessage = isEncryptor ? 
        (encryptorMessage(valueInput1, valueInput2))
        :
        (desencryptorMessage(valueInput1, valueInput2))
        outputKeyEncryptor = valueInput2
        showOutput = true
    }
</script>

<div class={isEncryptor ? "encryptador-body" : "encryptador-body alter-mode"}>
    <div class="encryptador-container">
        <h1>{UIText.titleMode}</h1>
        <div class="encryptador-form">
            <div class="input-group">
                <label for="message">{UIText.labelMessage}</label>
                <input 
                    id="message" 
                    class="input" 
                    bind:value={valueInput1} 
                    placeholder={UIText.placeholderMessage}>
            </div>
            <div class="input-group">
                <label for="key">{UIText.labelEncrypterKeyTitle}</label>
                <div class="key-group">
                    { #if isEncryptor }
                        <button on:click={handleButtonGeneratePassword}>Generar</button>
                    {/if}
                    <input 
                        id="key" 
                        class="input" 
                        bind:value={valueInput2}
                        placeholder={UIText.placeholderKey}>
                </div>
            </div>
            <div class="button-encryptor">
                <button 
                    class="button btn-enc"
                    on:click={handleEncryptorDesencyptor}
                    >{UIText.buttonText}</button>
            </div>
            <div>
                <button class="button change-mode" on:click={handleChangeMode}>Cambio de Modo</button>
            </div>
            {#if showOutput }
            <article class="encryptor-output">
                <div class="header">Salida </div>
                <div class="body">
                    <p>Mensaje de Salida</p>
                    <strong>{outputEncryptedMessage}</strong>
                    <p>Clave de Encriptación</p>
                    <strong>{outputKeyEncryptor}</strong>
                </div>
            </article>
            {/if}
        </div>
    </div>
</div>

<style>

    :root {
        --secondary-color-v1: #3b86ba;
        --secondary-color-v2: #100054;
    }

    .encryptador-container > h1 {
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        padding-top: 25px;
        padding-bottom: 25px;
    }

    .encryptador-body {
        width: 100vw;
        min-height: 100vh;
        background-color: var(--secondary-color-v2);
        color: var(--secondary-color-v1);
    }

    button {
        background: var(--secondary-color-v1);
    }


    .alter-mode {
        background-color: var(--secondary-color-v1);
        color: var(--secondary-color-v2);
    }

    strong, button {
        color: inherit;
    }

    .input-group {
        display: grid;
        gap: 4px;    
    }
    .encryptador-container {
        max-width: 300px;
        width: 100%;
        margin: 0 auto;
    }

    .encryptador-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .encryptador-form button {
        width: 100%;
        border: none;
        font-weight: 500;
    }

    .encryptador-form button {
        width: 100%;
        border: none;
        font-weight: 500;
    }

    .alter-mode .btn-enc {
        background-color: var(--secondary-color-v2) !important;
        color: var(--secondary-color-v1);
    }


    button.change-mode {
        background-color: transparent;
        border: 1px solid var(--secondary-color-v1);
    }

    .alter-mode button.change-mode {
        border: 1px solid var(--secondary-color-v2);
    }

    .encryptor-output {
        background-color: var(--secondary-color-v1);
        color: var(--secondary-color-v2);
        padding: 10px;
        border-radius: 10px;
    }

    .alter-mode .encryptor-output {
        background-color: var(--secondary-color-v2);
        color: var(--secondary-color-v1);
    }

    strong {
        color: inherit;
        min-height: 1em;
        display: block;
    }

    .key-group {
        display: grid;
        border-radius: 10px;
        grid-template-columns: auto 1fr;
    }

    .alter-mode .key-group {
        display: block;
    }

    .alter-mode .key-group input {
        border-radius: 10px;
    }

    .key-group button {
        padding: 0px 10px;
        border-radius: 10px 0px 0px 10px;
    }

    .key-group input {
        border-radius: 0px 10px 10px 0px;
    }

    .key-group button, .button-encryptor {
        color: var(--secondary-color-v2);
    }

    .alter-mode .key-group button {
        color: var(--secondary-color-v1);
    }


    .encryptor-output .header {
        font-size: 18px;
        text-align: center;
        font-weight: bold;
    }
</style>