import { pool } from "../db.js"
import { getContactsByIdQuery, AddContactQuery, createRoomQuery, isExistContact, addParticipantsQuery } from "../querys.js"

export const getContactsById = async (req, res) => {
    try {
        const { id } = req.params
        const response = await pool.query(getContactsByIdQuery(id))
        const data = response[0]

        return res.status(200).json({status: "ok", data})
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const addContacts = async (req, res) => {
    try {
        const { id_user_adding, id_user_added } = req.body
        
        const response = await pool.query(`CALL add_contact(${id_user_adding}, ${id_user_added})`)
        
        return res.status(200).json(response[0][0][0])
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}
