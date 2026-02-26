'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const INDIAN_FIGURES = [
  { id: 'gandhi', name: 'Mahatma Gandhi', era: '1869-1948', role: 'Freedom Fighter', img: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg' },
  { id: 'ambedkar', name: 'Dr. B.R. Ambedkar', era: '1891-1956', role: 'Constitution Architect', img: 'https://upload.wikimedia.org/wikipedia/commons/1/14/B._R._Ambedkar.jpg' },
  { id: 'bose', name: 'Subhas Chandra Bose', era: '1897-1945', role: 'Revolutionary Leader', img: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Subhas_Chandra_Bose_1945.jpg' },
  { id: 'nehru', name: 'Jawaharlal Nehru', era: '1889-1964', role: 'First Prime Minister', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Jawaharlal_Nehru_1959_%28cropped%29.jpg' },
  { id: 'patel', name: 'Sardar Vallabhbhai Patel', era: '1875-1950', role: 'Iron Man of India', img: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Sardar_Patel.jpg' },
  { id: 'azad', name: 'Maulana Abul Kalam Azad', era: '1888-1958', role: 'Scholar & Freedom Fighter', img: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Maulana_Azad.jpg' },
]

export default function Landing() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-orange-300 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold mb-6 border-8 border-black bg-white p-8 uppercase shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] inline-block">
            Chat with History
          </h1>
          <p className="text-2xl font-bold mt-6 uppercase bg-white border-4 border-black p-4 inline-block shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">Select a Historical Figure</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDIAN_FIGURES.map((figure) => (
            <div
              key={figure.id}
              className="border-8 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all cursor-pointer"
              onClick={() => router.push(`/chat?figure=${figure.id}`)}
            >
              <div className="border-4 border-black bg-yellow-200 h-48 mb-4 flex items-center justify-center overflow-hidden">
                <img src={figure.img} alt={figure.name} className="w-full h-full object-cover object-top" />
              </div>
              <h2 className="text-2xl font-bold uppercase mb-2">{figure.name}</h2>
              <p className="text-sm font-bold mb-1">{figure.era}</p>
              <p className="text-sm border-t-4 border-black pt-2 mt-2 uppercase">{figure.role}</p>
              <Button className="w-full mt-4 bg-green-300 hover:bg-green-500">
                Start Chat
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
