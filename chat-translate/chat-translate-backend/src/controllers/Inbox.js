import { pool } from "../db.js"
import { getInboxChatsByIdQuery, generateNewNinboxQuery, getMessagesByIdRoomQuery, insertMessageQuery, LoginAuthQuery, UpdatedLastestMessageQuery, getContactByIdQuery } from "../querys.js"

export const getInboxChatsById = async (id, id_idioma) => {
    try {
        const res = await pool.query(getInboxChatsByIdQuery(id, id_idioma))  
        
        return res[0]
    } catch(error) {
        console.log(error)
        return error
        
    
    }
}

export const getMessagesForIdRoom = async (id_room, id_idioma) => {
    try {
        const res = await pool.query(getMessagesByIdRoomQuery(id_room, id_idioma))

        return res[0]
    } catch (error) {
        console.log(error)
        return error
    }
}

export const AddMessage = async body => {
    try {
        const res = await pool.query(insertMessageQuery(body))
        const lastID = res[0].insertId
        const message = await pool.query(`SELECT * FROM messages WHERE id = ${lastID}`)

        return message[0]
    } catch (error) {
        console.log(error)
    }
}

export const LoginAuth = async body => {
    try {
        const { username, password } = body
        const res = await pool.query(LoginAuthQuery(username))
        const user = res[0][0]

        if(!user) return ({ status: "error", message: "El usuario no existe"})
        if(!(user.password === password)) return ({ status: "error", message: "Contraseña incorrecta"})

        return {status: "ok", user}
    } catch (error) {
        console.log(error)
    }
}

export const updatedLastestMessage = async body => {
    try {
        const res = await pool.query(UpdatedLastestMessageQuery(body))

        return ({status: "ok", message: "Done"})
    } catch (error) {
        console.log(error)
    }
}

export const getContactById = async ({ participants, id_room }) => {

    try {
        const { id_user_adding, id_user_added } = participants
        const res = await pool.query(getContactByIdQuery( id_user_added, id_room ))

        return res[0][0]
    } catch (error) {
        console.log(error)
    }
}

export const getNewInbox = async data => {
    try {
        const { participants, id_room } = data
        const { id_user_adding, id_user_added } = participants
        
        const res_adding = await pool.query(generateNewNinboxQuery(id_user_adding, id_room))
        const inbox_adding = res_adding[0][0]
        

        const res_added = await pool.query(generateNewNinboxQuery(id_user_added, id_room))
        const inbox_added = res_added[0][0]

        return { inbox_adding, inbox_added }
    } catch (error) {
        console.log(error)
        return []
    }
}