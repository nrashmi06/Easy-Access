import { useState } from "react";
import { askLLMController } from "../controllers/llm/askLLMController";
import { useSelector } from "react-redux";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);

  const userId = useSelector((state) => state.auth.userId);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const maxQuestions = 3;

  const handleSend = async () => {
    if (!input.trim()) return;

    if (questionCount >= maxQuestions) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Limit reached. Only 3 questions allowed per user." },
      ]);
      return;
    }

    const question = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: question }]);
    setInput("");
    setQuestionCount((prev) => prev + 1);

    try {
      const response = await askLLMController({ question, userId }, accessToken);
      if (response.error || !response.data?.answer) {
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: "⚠️" + (response.error || "No answer found. Please try again later."),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: response.data.answer },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: `⚠️ Error: ${error.message || "Something went wrong."}`,
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full justify-end flex flex-col items-end max-w-xs">
      {/* Toggle Button */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-circle btn-primary btn-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.906-1.471c-.446.413-.903.777-1.383 1.082C6.7 19.612 6.7 19.613 6.7 19.613A8.962 8.962 0 013 12C3 7.582 6.582 4 12 4s9 3.582 9 8z" />
          </svg>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(false)}
          className="btn btn-circle btn-error btn-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="w-full bg-base-100 border border-base-300 rounded-2xl shadow-2xl mt-4 overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-4 sm:max-w-sm">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-4 text-primary-content">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <h3 className="font-bold text-lg">AI Assistant</h3>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="p-4 pb-0">
            <div className="alert alert-warning shadow-lg text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>Limited to {maxQuestions} questions per session</span>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 h-80 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-base-300">
            {messages.length === 0 ? (
              <div className="text-center text-base-content/60 py-8">
                <div className="text-4xl mb-2">👋</div>
                <p className="text-sm">Start a conversation!</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat ${msg.from === "user" ? "chat-end" : "chat-start"} animate-in fade-in-0 slide-in-from-bottom-2`}
                >
                  <div className="chat-image avatar">
                    <div className="w-8 rounded-full">
                      {msg.from === "user" ? (
                        <div className="bg-primary text-primary-content w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
                          U
                        </div>
                      ) : (
                        <div className="bg-secondary text-secondary-content w-8 h-8 rounded-full flex items-center justify-center text-xs">
                          🤖
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`chat-bubble ${msg.from === "user" 
                      ? "chat-bubble-primary" 
                      : "chat-bubble-secondary"} text-sm shadow-md max-w-xs break-words`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-base-200 border-t border-base-300">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="input input-bordered w-full pr-10"
                  placeholder={questionCount >= maxQuestions ? "Limit reached" : "Type your question..."}
                  disabled={questionCount >= maxQuestions}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                {input && (
                  <button
                    onClick={() => setInput("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content/60"
                  >
                    ✕
                  </button>
                )}
              </div>
              <button
                onClick={handleSend}
                className="btn btn-primary btn-square shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                disabled={questionCount >= maxQuestions || !input.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-2">
              <progress 
                className="progress progress-primary w-full h-1" 
                value={questionCount} 
                max={maxQuestions}
              ></progress>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
