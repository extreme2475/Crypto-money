import React, { useEffect, useState, useContext, useRef } from 'react'
import './Advisor.css'
import { Coincontext } from '../../../context/Coincontext'
import { HfInference } from "@huggingface/inference";

const Advisor = () => {
  const { allCoin, currency } = useContext(Coincontext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Use the environment variable instead of a hardcoded string
  const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_KEY);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (allCoin && allCoin.length > 0 && messages.length === 0) {
      const top10 = allCoin.slice(0, 10);
      let stats = "Current Market Update (Top 10):\n\n";
      top10.forEach((c, i) => {
        stats += `${i+1}. ${c.name}: ${currency.symbol}${c.current_price.toLocaleString()}\n`;
      });

      setMessages([{
        role: "assistant",
        content: stats + "\nI am your AI Crypto Advisor. I now have access to your live price data. Ask me anything!"
      }]);
    }
  }, [allCoin, currency]);

  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "" || loading) return;
    
    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input; // Store current input before clearing
    setInput("");
    setLoading(true);

    try {
      // Context setup for AI
      const liveDataString = allCoin.slice(0, 20).map(c => 
        `${c.name} (${c.symbol.toUpperCase()}): ${currency.symbol}${c.current_price.toLocaleString()}`
      ).join(", ");

      const out = await hf.chatCompletion({
        model: "Qwen/Qwen2.5-72B-Instruct", 
        messages: [
          { 
            role: "system", 
            content: `You are a professional Crypto Advisor. 
            LIVE DATA: Current prices are: ${liveDataString}. 
            RULE: Use this LIVE DATA to answer price questions. Only discuss crypto. Be concise.` 
          },
          { 
            role: "user", 
            content: currentInput 
          }
        ],
        max_tokens: 500,
      });

      if(out.choices && out.choices.length > 0) {
        const aiText = out.choices[0].message.content;
        setMessages(prev => [...prev, { role: "assistant", content: aiText }]);
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Bhai, API busy hai. Please try again." 
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='advisor'>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`msg-bubble ${msg.role}`}>
            <div className="avatar">{msg.role === 'assistant' ? '🤖' : '👤'}</div>
            <p>{msg.content}</p>
          </div>
        ))}
        {loading && <div className="loader">AI is checking live prices...</div>}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input 
          type="text" 
          placeholder='Ask about Bitcoin price or trends...' 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? handleSend() : null}
        />
        <button onClick={handleSend} disabled={loading}>
            {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  )
}

export default Advisor