import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

export default function ChatLayout() {
  const { user, token } = useContext(AuthContext);
  const [active, setActive] = useState(null);

  return (
    <div className="w-screen h-[calc(100vh-80px)] bg-[#F7F3EE]">
      <div className="flex h-full">
        <ChatList user={user} token={token} onSelect={(c) => setActive(c)} activeId={active?.id} />
        <ChatWindow conversation={active} user={user} token={token} />
      </div>
    </div>
  );
}
