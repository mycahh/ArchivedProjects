const form = document.querySelector("#form")

function onSubmit(e){
    e.preventDefault()

    const nombre = document.querySelector("#name")
    const correo = document.querySelector("#correo")
    // const ticket = document.querySelector("#ticket")

    const body = {nombre: nombre.value, correo: correo.value, ticket: ticket.value}
    
    if(body.nombre === '') {
        alert('ERROR: Por favor rellene el campo de nombre')
        return
    }

    if(body.correo === '') {
        alert('ERROR: Por favor rellene el campo de correo')
        return
    }

    if(body.ticket === '') {
        alert('ERROR: Por favor rellene el campo de ticket')
        return
    }

    alert('Se ha enviado el formulario exitosamente.')
}

form.addEventListener("submit", onSubmit)