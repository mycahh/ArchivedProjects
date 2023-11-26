import express from 'express'
import { createServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import { getInboxChatsById, getMessagesForIdRoom, AddMessage, LoginAuth, updatedLastestMessage, getContactById, getNewInbox } from './controllers/Inbox.js'

import * as deepl from 'deepl-node';
const authKeyDeepl = "aec50144-cf5f-be8f-5473-446f2df981c9:fx"
const translator = new deepl.Translator(authKeyDeepl);

import 'dotenv/config'

import { SenderLangMap, TargetLangMap } from './lang.js'

import { UsernameRoutes, ContactsRoutes, AuthRoutes } from './routes/index.routes.js'

import cors from 'cors'

const app = express()
const port = process.env.PORT || 4000

app.use(cors({
  origin: 'https://chat-translate-client.vercel.app',

}))
app.use(express.json())

app.use('/users', UsernameRoutes)
app.use('/contacts', ContactsRoutes)
app.use('/auth', AuthRoutes)


const server = createServer(app).listen(port)
const io = new SocketServer(server, { 
  cors: {  
    origin: "https://chat-translate-client.vercel.app", 
    methods: ["GET", "POST"]}})

io.on('connection', socket => {


    socket.on("socket:new_room", async data => {
      const { participants, id_room } = data
      const { id_user_adding, id_user_added } = participants

      const participantsArray = Object.keys(participants).map(key => participants[key]);

      const new_inbox = await getNewInbox(data)
      const { inbox_adding, inbox_added } = new_inbox
      
      io.to(`contacts-${id_user_adding}`).emit('socket:new_room', {id_room, inbox: inbox_adding})
      io.to(`contacts-${id_user_added}`).emit('socket:new_room', {id_room, inbox: inbox_added})
    })

    socket.on("contact:added", async data => {
      const id = data.participants.id_user_adding
      const res = await getContactById(data)

      io.to(`contacts-${id}`).emit("contact:added", res)
    })

    socket.on("socket:new_listen", id_room => socket.join(id_room))

    socket.on('inbox:initial_load', async ({id, id_idioma}) => {
      const res = await getInboxChatsById(id, id_idioma)
      if(res.length !== 0) {
        const rooms = res.map(r => r.id_room)
        socket.join(rooms)
      }
      socket.join(`contacts-${id}`)
      socket.emit('inbox:initial_load', res)
    })

    socket.on('messages:getMessagesByIdRoom', async ({id_room, id_idioma}) => {
      const res = await getMessagesForIdRoom(id_room, id_idioma)
      socket.emit('messages:getMessagesByIdRoom', res)
    })

    socket.on('messages:clientSendMessage', async body => {
      const { id_room, message, id_user, id_idioma, other_lang, id_target } = body
      
      const res = await AddMessage({id_room, message, id_user, id_idioma})
      const new_message = res[0] 
      
      if(other_lang !== id_idioma) {
        const code_sender_lang = SenderLangMap.get(id_idioma)
        const code_target_lang = TargetLangMap.get(other_lang)

        const result = await translator.translateText(message, code_sender_lang, code_target_lang)
        const text = result.text

        const res_translate = await AddMessage({id_room, message: text, id_user, id_idioma:other_lang})
        const new_message_trans = res_translate[0]

        io.to(`contacts-${id_user}`).emit('messages:clientSendMessage', new_message)
        io.to(`contacts-${id_target}`).emit('messages:clientSendMessage', new_message_trans)
      } else {
        io.to(id_room).emit("messages:clientSendMessage", new_message)
      }
    })

    socket.on('auth:login', async body => {
      const res = await LoginAuth(body)
      socket.emit('auth:login', res)
    })

    socket.on('messages:readInbox', async body => {
      const res = await updatedLastestMessage(body)
      const { id_room } = body

      
      socket.emit("messages:readInbox", id_room)
      socket.to(id_room).emit("messages:readInbox", id_room)
    })
})
