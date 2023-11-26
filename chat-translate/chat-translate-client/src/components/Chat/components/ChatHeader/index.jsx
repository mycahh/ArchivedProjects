import { useContext } from "react"
import { InboxContext } from "../../../../store/context/inbox/inboxContext"

import "./ChatHeader.css"
import "../../../Display/Display.css"

function ChatHeader({toggleChatOpen}) {
  const { Pointer } = useContext(InboxContext)

  return (
    <div className="chat-header">
      <span className="back-button material-symbols-outlined" onClick={toggleChatOpen}>
        arrow_back
      </span>
      <h2>{Pointer ? Pointer?.displayName : ""}</h2>
    </div>
  );
};

export { ChatHeader };
