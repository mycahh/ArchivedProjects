import UserProvider from "./store/context/user/UserProvider"
import InboxProvider from "./store/context/inbox/inboxProvider"
import MessageProvider from "./store/context/message/MessageProvider"

import AppRouter from "./router"

function App() {
  return (
    <InboxProvider>
      <UserProvider>
        <MessageProvider>
          <AppRouter />
        </MessageProvider>
      </UserProvider>
    </InboxProvider>
  )
}

export default App
