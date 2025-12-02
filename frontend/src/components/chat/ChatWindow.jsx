import { useEffect, useRef, useState } from "react";
import { chatService } from "../../services/chatService";
import { createSocket } from "../../services/socket";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ conversation, user, token }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!conversation) return;
    if (conversation.demo) {
      setMessages(conversation.demoMessages || []);
      return;
    }
    if (!token) return;
    chatService
      .getMessages(conversation.id, token)
      .then((res) => setMessages(res.data))
      .catch(() => {});

    socketRef.current?.disconnect();
    socketRef.current = createSocket(token);
    socketRef.current.emit("joinRoom", conversation.id);
    socketRef.current.on("receiveMessage", (msg) => {
      if (msg.conversationId === conversation.id) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    socketRef.current.on("typing", () => {
      setTyping(true);
      setTimeout(() => setTyping(false), 1500);
    });

    return () => socketRef.current?.disconnect();
  }, [conversation, token]);

  useEffect(() => {
    if (!conversation || !token || !user) return;
    chatService
      .markRead({ conversationId: conversation.id, userId: user.id }, token)
      .catch(() => {});
  }, [conversation, messages.length, token, user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSend = async () => {
    if (!input.trim()) return;
    const optimistic = {
      id: Date.now(),
      conversationId: conversation.id,
      senderId: user.id,
      content: input,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    setInput("");
    if (!conversation.demo) {
      socketRef.current?.emit("sendMessage", { conversationId: conversation.id, content: optimistic.content });
      try {
        await chatService.sendMessage(
          { conversationId: conversation.id, senderId: user.id, content: optimistic.content },
          token
        );
      } catch {}
    }
  };

  const onTyping = () => {
    if (!conversation.demo) socketRef.current?.emit("typing", { conversationId: conversation.id });
  };

  const other = conversation
    ? conversation.buyer.id === user.id
      ? conversation.seller
      : conversation.buyer
    : null;

  return (
    <div className="flex-1 h-[calc(100vh-80px)] bg-[#F7F3EE] rounded-l-3xl p-6 flex flex-col">
      {conversation ? (
        <>
          <div className="flex items-center justify-between pb-4 border-b border-black/10">
            <div className="flex items-center gap-3">
              <img
                src={conversation.item?.images ? JSON.parse(conversation.item.images)[0] : "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=200"}
                alt="item"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <div className="font-serif font-semibold">{conversation.item?.name || "Campus Closet Item"}</div>
                <div className="text-sm text-black/60">Messaging with {other?.name} ({other && (conversation.seller.id === other.id ? "Seller" : "Buyer")})</div>
              </div>
            </div>
            <button className="text-black/50">⋮</button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.senderId === user.id ? "justify-end" : "justify-start"}`}>
                <MessageBubble message={m} isOwn={m.senderId === user.id} />
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-2 text-black/50">
                <div className="bg-[#F3EEE8] rounded-full px-3 py-2 shadow-sm">…</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="mt-2">
            <div className="flex items-center gap-3 bg-white/50 backdrop-blur rounded-2xl px-4 py-3 shadow-sm">
              <button className="text-black/60">＋</button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onInput={onTyping}
                className="flex-1 bg-transparent outline-none placeholder-black/40"
                placeholder="Type your message..."
              />
              <button
                onClick={onSend}
                className="px-5 py-2 rounded-full bg-[#C7BAA3] text-white shadow-md hover:opacity-90"
              >
                Send
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="h-full flex items-center justify-center text-black/50">Select a conversation to start chatting</div>
      )}
    </div>
  );
}
