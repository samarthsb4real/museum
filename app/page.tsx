'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Mic, Send, Trash2, Copy } from 'lucide-react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const HISTORICAL_FIGURES = [
  { id: 'einstein', name: 'Albert Einstein' },
  { id: 'cleopatra', name: 'Cleopatra' },
  { id: 'shakespeare', name: 'William Shakespeare' },
  { id: 'davinci', name: 'Leonardo da Vinci' },
  { id: 'curie', name: 'Marie Curie' },
]

type Message = {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function Home() {
  const [selectedFigure, setSelectedFigure] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (transcript) setInput(transcript)
  }, [transcript])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || !selectedFigure) return
    
    setMessages(prev => [...prev, { role: 'user', content: input, timestamp: new Date() }])
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `As ${HISTORICAL_FIGURES.find(f => f.id === selectedFigure)?.name}, I would say...`,
        timestamp: new Date()
      }])
    }, 1000)
    
    setInput('')
    resetTranscript()
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

  const clearChat = () => {
    setMessages([])
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-yellow-300 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-8 border-8 border-black bg-white p-6 uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          Historical Museum
        </h1>

        <div className="border-8 border-black bg-white p-6 mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between mb-4">
            <label className="text-xl uppercase">Select Historical Figure:</label>
            {messages.length > 0 && (
              <Button onClick={clearChat} className="bg-red-200 hover:bg-red-500 px-4 py-2">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
          <Select 
            value={selectedFigure} 
            onChange={(e) => setSelectedFigure(e.target.value)}
            className="w-full"
          >
            <option value="">Choose a figure...</option>
            {HISTORICAL_FIGURES.map(figure => (
              <option key={figure.id} value={figure.id}>{figure.name}</option>
            ))}
          </Select>
        </div>

        {selectedFigure && (
          <>
            <div className="border-8 border-black bg-white p-6 mb-6 h-[500px] overflow-y-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {messages.length === 0 ? (
                <p className="text-gray-500 uppercase">Start chatting with {HISTORICAL_FIGURES.find(f => f.id === selectedFigure)?.name}...</p>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`border-4 border-black p-4 relative group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                        msg.role === 'user' ? 'bg-blue-200 ml-12' : 'bg-green-200 mr-12'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-xs uppercase font-bold">
                          {msg.role === 'user' ? 'You' : HISTORICAL_FIGURES.find(f => f.id === selectedFigure)?.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600">{formatTime(msg.timestamp)}</span>
                          <button
                            onClick={() => copyMessage(msg.content)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                          >
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
                <Button
                  onClick={toggleRecording}
                  className={listening ? 'bg-red-500 border-red-700 text-white' : ''}
                  title="Voice input"
                >
                  <Mic className="w-5 h-5" />
                </Button>
                <Button onClick={handleSend} disabled={!input.trim()} title="Send message">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
