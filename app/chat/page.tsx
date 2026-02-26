'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mic, Send, Trash2, Copy, ArrowLeft } from 'lucide-react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useRouter, useSearchParams } from 'next/navigation'

const INDIAN_FIGURES = [
  { id: 'gandhi', name: 'Mahatma Gandhi' },
  { id: 'ambedkar', name: 'Dr. B.R. Ambedkar' },
  { id: 'bose', name: 'Subhas Chandra Bose' },
  { id: 'nehru', name: 'Jawaharlal Nehru' },
  { id: 'patel', name: 'Sardar Vallabhbhai Patel' },
  { id: 'azad', name: 'Maulana Abul Kalam Azad' },
]

type Message = {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function Chat() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const figureId = searchParams.get('figure') || ''
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const selectedFigure = INDIAN_FIGURES.find(f => f.id === figureId)

  useEffect(() => {
    if (transcript) setInput(transcript)
  }, [transcript])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || !selectedFigure) return

    const userMessage = { role: 'user' as const, content: input, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    resetTranscript()

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })
      const data = await response.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I am unable to respond at the moment.',
        timestamp: new Date()
      }])
    }
  }

  const toggleRecording = () => {
    if (!browserSupportsSpeechRecognition) {
      alert('Browser does not support speech recognition')
      return
    }

    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      resetTranscript()
      setInput('')
      SpeechRecognition.startListening({ continuous: true })
    }
  }

  const clearChat = () => setMessages([])
  const copyMessage = (content: string) => navigator.clipboard.writeText(content)
  const formatTime = (date: Date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  if (!selectedFigure) {
    router.push('/')
    return null
  }

  return (
    <div className="min-h-screen bg-orange-300 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button onClick={() => router.push('/')} className="px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-4xl font-bold border-8 border-black bg-white p-6 uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex-1">
            💬 {selectedFigure.name}
          </h1>
        </div>

        <div className="border-8 border-black bg-white p-6 mb-6 h-[500px] overflow-y-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {messages.length === 0 ? (
            <p className="text-gray-500 uppercase">Start your conversation...</p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`border-4 border-black p-4 relative group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${msg.role === 'user' ? 'bg-blue-200 ml-12' : 'bg-green-200 mr-12'
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs uppercase font-bold">
                      {msg.role === 'user' ? 'You' : selectedFigure.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">{formatTime(msg.timestamp)}</span>
                      <button onClick={() => copyMessage(msg.content)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>{msg.content}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="border-8 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="TYPE YOUR MESSAGE..."
                className="w-full"
              />
              {listening && <p className="text-xs mt-2 text-red-600 uppercase font-bold">● Recording...</p>}
            </div>
            {messages.length > 0 && (
              <Button onClick={clearChat} className="bg-red-200 hover:bg-red-500">
                <Trash2 className="w-5 h-5" />
              </Button>
            )}
            <Button onClick={toggleRecording} className={listening ? 'bg-red-500 border-red-700 text-white' : ''}>
              <Mic className="w-5 h-5" />
            </Button>
            <Button onClick={handleSend} disabled={!input.trim()}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
