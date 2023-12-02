const form = document.querySelector("#form")

function onSubmit(e){
    e.preventDefault()

    const nombre = document.querySelector("#name")
    const correo = document.querySelector("#correo")
    const mensaje = document.querySelector("#mensaje")

    const body = {nombre: nombre.value, correo: correo.value, mensaje: mensaje.value}
    
    if(body.nombre === '') {
        alert('ERROR: Por favor rellene el campo de nombre')
        return
    }

    if(body.correo === '') {
        alert('ERROR: Por favor rellene el campo de correo')
        return
    }

    if(body.mensaje === '') {
        alert('ERROR: Por favor rellene el campo de mensaje')
        return
    }

    alert('Se ha enviado el formulario exitosamente.')
}
form.addEventListener("submit", onSubmit)

console.log(form)