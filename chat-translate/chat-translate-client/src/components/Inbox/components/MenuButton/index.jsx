import React from "react";
import "./MenuButton.css"

function MenuButton({ toggleMenu }) {
    return (
        <span className="material-symbols-outlined material-symbols-outlined-menu hvr-grow" onClick={toggleMenu}>
        menu
        </span>
    )
}

export { MenuButton }