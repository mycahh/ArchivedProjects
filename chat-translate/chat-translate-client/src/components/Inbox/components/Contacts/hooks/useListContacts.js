import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../../../../store/context/user/UserContext"
import socket from "../../../../../helpers/socket"

function useListContacts() {
    const [ listContacts, setListContacts ] = useState([])

    const {user_data: {id}} = useContext(UserContext)

    useEffect(()=> {
      fetch(`https://chat-translate.azurewebsites.net/contacts/${id}`)
      .then((response) => response.json())
      .then((body) => {
        if(body.data !== 0) setListContacts(body.data)
      })

      socket.on("contact:added", res => {
        setListContacts(l => [...l, res])
      })

      return () => {
        socket.off("contact:added")
      }
    }, [id])

    
    return { listContacts }
}

export default useListContacts