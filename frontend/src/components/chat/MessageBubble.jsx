export default function MessageBubble({ message, isOwn }) {
  const bubbleClasses = isOwn
    ? "bg-[#B59C89] text-white rounded-2xl rounded-br-md shadow-sm"
    : "bg-[#F3EEE8] text-[#5E5349] rounded-2xl rounded-bl-md shadow-sm";

  return (
    <div className={`max-w-[70%] px-4 py-3 ${bubbleClasses}`}>
      <p className="leading-relaxed text-sm">{message.content}</p>
      <div className="text-[11px] opacity-70 mt-2">{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
    </div>
  );
}

