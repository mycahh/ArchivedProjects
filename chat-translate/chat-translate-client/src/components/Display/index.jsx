import React, { useState, useEffect } from 'react';
import { Chat } from '../Chat';
import { Inbox } from '../Inbox';

import './Display.css';

function Display() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChatOpen = () => {
    if (window.innerWidth <= 768) {
      setIsChatOpen(!isChatOpen);
    }
  };

  useEffect(() => {
    // Función para manejar cambios en el tamaño de la ventana
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsChatOpen(false); // Si el ancho de la pantalla es mayor a 768px, establecer isChatOpen en false
      }
    };

    // Agregar un event listener para detectar cambios de tamaño en la ventana
    window.addEventListener('resize', handleResize);

    // Al desmontar el componente, eliminar el event listener para evitar fugas de memoria
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="Display">
      <Inbox toggleChatOpen={toggleChatOpen} />
      <Chat isChatOpen={isChatOpen} toggleChatOpen={toggleChatOpen} />
    </div>
  );
}

export { Display };
