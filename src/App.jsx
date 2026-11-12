import { useState, useRef, useEffect } from 'react';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

const INITIAL_AUDIT_MEMORY = {
  company_id: 'CORP-7729-A',
  audit_history: {
    '2024_Q3_Security_Audit': [
      {
        finding_id: 'AUD-24-08',
        severity: 'High',
        issue: 'Vendor Access Review missing for Q3.',
        resolution_status: 'Closed',
        resolution_notes:
          'Ticket marked complete by IT Admin. No proof of access logs uploaded.',
        auditor_warning:
          'High risk of repeat finding in 2025 if evidence is not strictly attached to the ticket.',
      },
    ],
  },
  current_context: 'Preparing for 2025 Q1 ISO-27001 Audit.',
}

function App() {
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  const [hindsightMemoryOn, setHindsightMemoryOn] = useState(false)
  const [auditMemoryContext] = useState(INITIAL_AUDIT_MEMORY)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const feedRef = useRef(null)

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const submitToBackend = async (userMessage) => {
    const groqMessages = [
      {
        role: 'system',
        content: 'You are an expert Audit Compliance AI Agent. You must always answer entirely in English.'
      }
    ]

    if (hindsightMemoryOn) {
      groqMessages.push({
        role: 'system',
        content: `You are a compliance Audit Agent. Here is the historical context: ${JSON.stringify(auditMemoryContext)}`
      })
    }

    groqMessages.push({
      role: 'user',
      content: userMessage,
    })

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemma2-9b-it',
        messages: groqMessages,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText || `Groq request failed (${response.status})`)
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content?.trim() || 'No response returned.'
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const text = input.trim()
    if (!text || isLoading) return

    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${prev.length}`,
        role: 'user',
        content: text,
      },
    ])
    setInput('')
    setIsLoading(true)

    try {
      const reply = await submitToBackend(text)
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: 'assistant',
          content: reply,
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          role: 'assistant',
          content: `The agent could not complete this request. ${error.message}`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-[#1F3D2B] via-[#1F3D2B] to-[#7a6d54] text-[#F5F0E6]">
      
      {/* Scattered Stars Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40 animate-stars"
        style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 15% 25%, #F5F0E6 100%, transparent),
            radial-gradient(2px 2px at 45% 10%, #F5F0E6 100%, transparent),
            radial-gradient(1px 1px at 75% 35%, #F5F0E6 100%, transparent),
            radial-gradient(2.5px 2.5px at 90% 15%, #F5F0E6 100%, transparent),
            radial-gradient(1px 1px at 25% 65%, #F5F0E6 100%, transparent),
            radial-gradient(2px 2px at 55% 85%, #F5F0E6 100%, transparent),
            radial-gradient(1.5px 1.5px at 85% 75%, #F5F0E6 100%, transparent),
            radial-gradient(1px 1px at 10% 90%, #F5F0E6 100%, transparent),
            radial-gradient(2px 2px at 35% 45%, #F5F0E6 100%, transparent),
            radial-gradient(1.5px 1.5px at 65% 55%, #F5F0E6 100%, transparent)
          `,
          backgroundSize: '160px 160px'
        }}
      />

      {/* Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-[800px] h-[500px] bg-[#8B5CF6] rounded-full blur-[120px] opacity-20 pointer-events-none" />

      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-message {
          animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes starDrift {
          from { background-position: 0px 0px; }
          to { background-position: -160px -160px; }
        }
        .animate-stars {
          animation: starDrift 15s linear infinite;
        }
      `}</style>

      {/* Header */}
      <header className="relative z-50 border-b border-[#F5F0E6]/10 bg-[#1F3D2B]/60 backdrop-blur-xl shadow-md shrink-0">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B5CF6] drop-shadow-sm">
              Compliance Operations
            </p>
            <h1 className="text-xl font-semibold text-[#F5F0E6] tracking-tight mt-0.5">
              Audit Intelligence Console
            </h1>
            <p className="text-sm text-[#F5F0E6]/80 mt-1">
              CORP-7729-A · ISO-27001 Q1 2025
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-[#F5F0E6]/10 bg-[#1F3D2B]/80 px-4 py-2.5 backdrop-blur-md shadow-inner">
            <span className="text-sm font-medium text-[#F5F0E6]">
              Hindsight Memory: {' '}
              <span className={hindsightMemoryOn ? 'font-bold text-[#8B5CF6] drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]' : 'text-[#F5F0E6]/60'}>
                {hindsightMemoryOn ? 'ON' : 'OFF'}
              </span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={hindsightMemoryOn}
              onClick={() => setHindsightMemoryOn(!hindsightMemoryOn)}
              className={`relative h-6 w-11 shrink-0 overflow-hidden rounded-full p-0.5 transition-all duration-300 ${
                hindsightMemoryOn
                  ? 'bg-[#8B5CF6] shadow-[0_0_15px_rgba(139,92,246,0.8)]'
                  : 'bg-[#1F3D2B] border border-[#F5F0E6]/30'
              }`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-[#F5F0E6] shadow-md transition-transform duration-300 ${
                  hindsightMemoryOn ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Chat Interface */}
      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-8 min-h-0">
        <section className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#F5F0E6]/10 bg-[#162c1f]/60 shadow-2xl backdrop-blur-xl">
          <div
            ref={feedRef}
            className="flex-1 space-y-6 overflow-y-auto px-6 py-6 scroll-smooth"
          >
            {messages.length === 0 && !isLoading ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center animate-message">
                <div className="w-16 h-16 rounded-2xl bg-[#1F3D2B]/80 border border-[#F5F0E6]/10 flex items-center justify-center mb-4 shadow-lg shadow-[#8B5CF6]/20">
                  <svg className="w-8 h-8 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-[#F5F0E6]">
                  Secure Terminal Online
                </p>
                <p className="mt-2 max-w-md text-sm text-[#F5F0E6]/90 leading-relaxed">
                  Submit an audit inquiry below. Toggle Hindsight Memory to inject isolated historical findings directly into the secure reasoning context.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex animate-message ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-5 py-3.5 text-[15px] leading-relaxed shadow-lg whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'rounded-2xl rounded-br-sm bg-[#8B5CF6] text-white font-medium shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                        : 'rounded-2xl rounded-bl-sm bg-[#1F3D2B]/90 text-[#F5F0E6] border border-[#F5F0E6]/10'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex justify-start animate-message">
                <div className="rounded-2xl rounded-bl-sm bg-[#1F3D2B]/90 border border-[#F5F0E6]/10 px-5 py-4 shadow-lg">
                  <div className="flex space-x-2 items-center h-2">
                    <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse shadow-[0_0_8px_#8B5CF6]" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse shadow-[0_0_8px_#8B5CF6]" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse shadow-[0_0_8px_#8B5CF6]" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex gap-3 border-t border-[#F5F0E6]/10 bg-[#162c1f]/80 p-4 backdrop-blur-md shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={isLoading}
              placeholder="Query the audit logs..."
              className="flex-1 rounded-xl border border-[#F5F0E6]/20 bg-[#1F3D2B] px-4 py-3 text-[15px] text-[#F5F0E6] outline-none transition-all placeholder:text-[#F5F0E6]/40 focus:border-[#8B5CF6] focus:bg-[#162c1f] focus:ring-1 focus:ring-[#8B5CF6]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-xl bg-[#8B5CF6] px-6 py-3 text-[15px] font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all hover:bg-[#7c4dff] active:scale-95 disabled:pointer-events-none disabled:opacity-50"
            >
              Submit
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App