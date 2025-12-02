import { useEffect, useState } from "react";
import { chatService } from "../../services/chatService";

export default function ChatList({ user, token, onSelect, activeId }) {
  const [conversations, setConversations] = useState([]);
  const [query, setQuery] = useState("");

  const buildDemo = () => {
    const now = new Date();
    const day = 24 * 60 * 60 * 1000;
    const makeTime = (d) => new Date(now.getTime() - d).toISOString();
    return [
      {
        id: 1001,
        item: { id: 201, name: "Vintage Armchair", images: JSON.stringify(["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400"]) },
        buyer: { id: 9000, name: "Alex", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
        seller: { id: 9001, name: "Sarah", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
        lastMessage: { content: "Of course. Does 7 PM work for you?", createdAt: makeTime(30 * 60 * 1000) },
        updatedAt: makeTime(30 * 60 * 1000),
        demo: true,
        demoMessages: [
          { id: 1, conversationId: 1001, senderId: 9000, content: "Hi! Is this armchair still available? I saw it on Campus Closet.", createdAt: makeTime(90 * 60 * 1000) },
          { id: 2, conversationId: 1001, senderId: 9001, content: "Hey! Yes, it is. It's in great condition, just a minor scuff on one leg.", createdAt: makeTime(89 * 60 * 1000) },
          { id: 3, conversationId: 1001, senderId: 9000, content: "That's fine by me! Could I pick it up tomorrow evening?", createdAt: makeTime(88 * 60 * 1000) },
          { id: 4, conversationId: 1001, senderId: 9001, content: "Of course. Does 7 PM work for you?", createdAt: makeTime(30 * 60 * 1000) },
        ],
      },
      {
        id: 1002,
        item: { id: 202, name: "Graphic Hoodie", images: JSON.stringify(["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"]) },
        buyer: { id: 9002, name: "Priya", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
        seller: { id: 9003, name: "Mike", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
        lastMessage: { content: "Great, I'll take it!", createdAt: makeTime(day) },
        updatedAt: makeTime(day),
        demo: true,
        demoMessages: [
          { id: 5, conversationId: 1002, senderId: 9002, content: "Is the hoodie still available?", createdAt: makeTime(2 * day) },
          { id: 6, conversationId: 1002, senderId: 9003, content: "Yes, available. Tan color, size M.", createdAt: makeTime(2 * day - 10 * 60 * 1000) },
          { id: 7, conversationId: 1002, senderId: 9002, content: "Great, I'll take it!", createdAt: makeTime(day) },
        ],
      },
      {
        id: 1003,
        item: { id: 203, name: "Modern LED Desk Lamp", images: JSON.stringify(["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400"]) },
        buyer: { id: 9004, name: "Alex", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
        seller: { id: 9005, name: "Priya", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
        lastMessage: { content: "I can meet you on campus.", createdAt: makeTime(2 * day) },
        updatedAt: makeTime(2 * day),
        demo: true,
        demoMessages: [
          { id: 8, conversationId: 1003, senderId: 9004, content: "Does the lamp have warm white light?", createdAt: makeTime(2 * day + 3 * 60 * 60 * 1000) },
          { id: 9, conversationId: 1003, senderId: 9005, content: "Yes, adjustable brightness and warm white.", createdAt: makeTime(2 * day + 3.5 * 60 * 60 * 1000) },
          { id: 10, conversationId: 1003, senderId: 9005, content: "I can meet you on campus.", createdAt: makeTime(2 * day) },
        ],
      },
    ];
  };

  useEffect(() => {
    if (!user || !token) {
      const demo = buildDemo();
      setConversations(demo);
      return;
    }
    chatService
      .getConversations(user.id, token)
      .then((res) => {
        const list = res.data;
        if (!list || list.length === 0) setConversations(buildDemo());
        else setConversations(list);
      })
      .catch(() => setConversations(buildDemo()));
  }, [user, token]);

  useEffect(() => {
    if (conversations.length && !activeId) onSelect(conversations[0]);
  }, [conversations, activeId, onSelect]);

  const filtered = conversations.filter((c) => {
    const name = c.buyer.id === user.id ? c.seller.name : c.buyer.name;
    return name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="w-96 h-[calc(100vh-80px)] bg-[#A38D7B] text-white rounded-r-3xl p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-3">Messages</h2>
      <input
        className="bg-white/20 text-white placeholder-white/70 rounded-full px-4 py-2 outline-none shadow-sm"
        placeholder="Search chats..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="mt-4 space-y-2 overflow-y-auto pr-2">
        {filtered.map((c) => {
          const other = c.buyer.id === user.id ? c.seller : c.buyer;
          const roleLabel = c.seller.id === other.id ? "Seller" : "Buyer";
          const preview = c.lastMessage?.content || "";
          const ts = c.lastMessage?.createdAt
            ? new Date(c.lastMessage.createdAt).toLocaleDateString()
            : "";
          const isActive = activeId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c)}
              className={`w-full text-left flex items-center gap-3 p-3 rounded-2xl ${
                isActive ? "bg-white/15" : "hover:bg-white/10"
              }`}
            >
              <img
                src={other.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Campus"}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{other.name} ({roleLabel})</span>
                  <span className="text-xs opacity-70">{ts}</span>
                </div>
                <div className="text-sm opacity-80 truncate">
                  {preview}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
