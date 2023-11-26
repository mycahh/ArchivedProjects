function getInboxChatsByIdQuery(id, id_idioma) {
    return `SELECT u1.*, u.username, u.displayName, u.id, u.photo_url, u.id_idioma FROM (SELECT p.id_room,
        (SELECT COUNT(id) FROM messages WHERE id > p.id_lastest_messages AND p.id_room = id_room AND id_user != ${id} AND id_idioma = ${id_idioma} ) as counter,
        (SELECT message FROM messages WHERE id_room = p.id_room AND id_idioma = ${id_idioma} ORDER BY id DESC LIMIT 1) AS message,
        (SELECT id FROM messages WHERE id_room = p.id_room AND id_idioma = ${id_idioma} ORDER BY id DESC LIMIT 1) AS id_message,
        (SELECT created_at FROM messages WHERE id_room = p.id_room AND id_idioma = ${id_idioma} ORDER BY id DESC LIMIT 1) AS created_at
        FROM participants p
        WHERE id_user = ${id}) as u1
        INNER JOIN participants p
        ON p.id_room = u1.id_room
        INNER JOIN users u
        ON p.id_user = u.id
        WHERE p.id_user != ${id}`
}

function getMessagesByIdRoomQuery(id_room, id_idioma) {
    return `SELECT * FROM messages WHERE id_room = ${id_room} AND id_idioma = ${id_idioma}`
}

function insertMessageQuery(body) {
    const { message, id_user, id_room, id_idioma } = body
    return `INSERT INTO messages (message, id_user, id_room, id_idioma) VALUES ("${message}", ${id_user}, ${id_room}, ${id_idioma})`
}

function LoginAuthQuery(username) {
    return `SELECT * FROM users WHERE username="${username}"`
}

function UpdatedLastestMessageQuery(body) {
    const { id_user, id_message, id_room } = body
    return `UPDATE participants SET id_lastest_messages = ${id_message} WHERE id_user=${id_user} AND id_room = ${id_room}`
}

export function getUserByUsernameQuery(username) {
    return `SELECT id, username, displayName, photo_url FROM users WHERE username="${username}"`
}

export function AddContactQuery(body) {
    const { id_user_adding, id_user_added } = body
    return `INSERT INTO contacts (id_user_adding, id_user_added) VALUES ("${id_user_adding}", "${id_user_added}")`
}

export const createRoomQuery = 'INSERT INTO rooms VALUES()'

export function getContactsByIdQuery(id_user_adding) {
    return `SELECT u.id, u.username, u.displayName, u.photo_url, u.id_idioma, p.id_room FROM users u
    INNER JOIN contacts c
    ON c.id_user_added = u.id
    INNER JOIN participants p
    ON p.id_user = u.id
    WHERE c.id_user_adding = ${id_user_adding}`
}

export function getContactByIdQuery(id_user_added, id_room) {
    return `SELECT u.id, u.username, u.displayName, u.photo_url, p.id_room, u.id_idioma FROM users u
    INNER JOIN contacts c
    ON c.id_user_added = u.id
    INNER JOIN participants p
    ON p.id_user = u.id
    WHERE c.id_user_added = ${id_user_added} AND p.id_room = ${id_room}`
}

export function isExistContact(body) {
    const { id_user_adding, id_user_added } = body
    return `SELECT count(id) as "existContact" FROM contacts WHERE id_user_adding = ${id_user_adding} AND id_user_added=${id_user_added}`
}

export function addParticipantsQuery(body) {
    const { id_room, id_user_adding, id_user_added } = body
    return `INSERT INTO participants(id_room, id_user) VALUES (${id_room}, ${id_user_adding}), (${id_room}, ${id_user_added})`
}

export function authRegisterQuery({ username, password, displayName, photo_url, idioma}) {

    return `INSERT INTO users(username, password, displayName, photo_url, id_idioma) VALUES ("${username}", "${password}", "${displayName}", "${photo_url}", "${parseInt(idioma)}")`
}

export function generateNewNinboxQuery(id, id_room) {
    return(`
    SELECT u1.*, u.username, u.displayName, u.id, u.photo_url FROM (SELECT p.id_room,
        (SELECT COUNT(id) FROM messages WHERE id > p.id_lastest_messages AND p.id_room = id_room AND id_user != ${id} ) as counter,
        (SELECT message FROM messages WHERE id_room = p.id_room ORDER BY id DESC LIMIT 1) AS message,
        (SELECT id FROM messages WHERE id_room = p.id_room ORDER BY id DESC LIMIT 1) AS id_message,
        (SELECT created_at FROM messages WHERE id_room = p.id_room ORDER BY id DESC LIMIT 1) AS created_at
        FROM participants p
        WHERE id_user = ${id}) as u1
        INNER JOIN participants p
        ON p.id_room = u1.id_room
        INNER JOIN users u
        ON p.id_user = u.id
        WHERE p.id_user != ${id} AND p.id_room = ${id_room}
    `)
}



export { getInboxChatsByIdQuery, getMessagesByIdRoomQuery, insertMessageQuery, LoginAuthQuery, UpdatedLastestMessageQuery }