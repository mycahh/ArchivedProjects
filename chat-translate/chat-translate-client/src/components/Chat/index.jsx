import React, { useState } from "react";
import { ChatHeader } from "./components/ChatHeader";
import { MessageContainer } from "./components/MessageContainer";
import { ChatInput } from "./components/ChatInput";

import "../Display/Display.css"


function Chat({isChatOpen, toggleChatOpen}){

  

  return (
    <div className={`${isChatOpen === true ? "chat-open" : "chat-closed"}`}>
      <ChatHeader toggleChatOpen={toggleChatOpen}/>
      <MessageContainer />
      <ChatInput/>
    </div>
  );
};

export { Chat };


{/* <OtherMessage sender= "Mikael" message="Hola, ¿cómo estás?" />
        <OtherMessage sender= "Naranjo" message="¡Hola! Estoy bien, gracias. ¿Y tú?" />
        <OwnMessage message="Hola, Mikael y Naranjo. ¡Me alegra unirme a la conversación!" />
        <OtherMessage sender= "Mikael" message="Estoy bien, gracias. ¿Qué han estado haciendo?" />
        <OtherMessage sender= "Naranjo" message="Nosotros estábamos discutiendo sobre un proyecto de desarrollo web. ¿Tienes alguna experiencia en programación?" />
        <OwnMessage message="Sí, tengo experiencia en desarrollo web. Me especializo en tecnologías front-end como React y CSS." />
        <OtherMessage sender= "Mikael" message="¡Eso suena genial! ¿Has trabajado en algún proyecto interesante recientemente?" />
        <OtherMessage sender= "LARGOOOOOOOOOOOOOOOOOOOOO" message="Sí, recientemente completé un proyecto de comercio electrónico utilizando React y Redux. Fue un desafío, pero me gustó mucho el resultado final." />
        <OwnMessage message="¡Impresionante! Me encantaría ver tu proyecto. Tal vez podamos compartir nuestras experiencias y aprender el uno del otro." />
        <OtherMessage sender= "Mikael" message="Hola, ¿cómo estás?" />
        <OtherMessage sender= "Naranjo" message="¡Hola! Estoy bien, gracias. ¿Y tú?" />
        <OwnMessage message="Hola, Mikael y Naranjo. ¡Me alegra unirme a la conversación!" />
        <OtherMessage sender= "Mikael" message="Estoy bien, gracias. ¿Qué han estado haciendo?" />
        <OtherMessage sender= "Naranjo" message="Nosotros estábamos discutiendo sobre un proyecto de desarrollo web. ¿Tienes alguna experiencia en programación?" />
        <OwnMessage message="Sí, tengo experiencia en desarrollo web. Me especializo en tecnologías front-end como React y CSS." />
        <OtherMessage sender= "Mikael" message="¡Eso suena genial! ¿Has trabajado en algún proyecto interesante recientemente?" />
        <OtherMessage sender= "LARGOOOOOOOOOOOOOOOOOOOOO" message="Sí, recientemente completé un proyecto de comercio electrónico utilizando React y Redux. Fue un desafío, pero me gustó mucho el resultado final." />
        <OwnMessage message="¡Impresionante! Me encantaría ver tu proyecto. Tal vez podamos compartir nuestras experiencias y aprender el uno del otro." /> */}