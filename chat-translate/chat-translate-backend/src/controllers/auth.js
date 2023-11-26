import { pool } from "../db.js"
import { authRegisterQuery, LoginAuthQuery } from "../querys.js"

export const LoginAuthentication = async (req, res) => {
    try {
        const { username, password } = req.body
        const resp = await pool.query(LoginAuthQuery(username))
        const user = resp[0][0]

        if(!user) {
            return res.status(200).json({ status: "error", message: "El usuario no existe"})
        }
        if(!(user.password === password)) {
            return res.status(200).json({ status: "error", message: "Las credenciales no coincide."})
        }

        delete user.password
        return res.status(200).json({
            status: "ok",
            data: user
        })

    } catch (error) {
            res.status(404).json(error)
            console.log(error)
    }
}

export const RegisterAuthentication = async (req, res) => {
    try {
        const user = req.body
        const { username, password, displayName, idioma } = user

        const random_number = Math.floor(Math.random() * 478) + 1
        const final_string = random_number > 99 ? random_number : `0${random_number}`
        
        const photo_url = `https://www.serebii.net/dungeonrescueteamdx/pokemon/${final_string}.png`

        const respIsExistUser = await pool.query(`SELECT COUNT(id) as Counter FROM users WHERE username = "${username}"`)
        const isExistUser = respIsExistUser[0][0].Counter

        if(isExistUser) return res.status(200).json({ status: "error", message: "este usuario ya existe"})

        const resp = await pool.query(authRegisterQuery({ username, password, displayName, photo_url, idioma }));        
        const id = resp[0].insertId

        delete user.password
        user.photo_url = photo_url
        user.id = id
        
        return res.status(200).json({
            status: "ok",
            data: user
        })
        
    } catch (error) {
        res.status(404).json(error)
        console.log(error)
    }
}