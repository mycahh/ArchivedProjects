import { pool } from "../db.js"
import { getUserByUsernameQuery } from "../querys.js"

export const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params
        const response = await pool.query(getUserByUsernameQuery(username))
        const data = response[0]

        if(!data.length) return res.status(200).json({ status: "error", message: "Este usuario no se encuentra registrado" })

        const user = data[0]

        return res.status(200).json({status: "ok", data: user})
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const createUser = async (req, res) => {
    try {
        const body = req.body;

        
    } catch (error) {
        return res.status(400).json(error)
    }
}