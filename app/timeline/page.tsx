'use client'

const TIMELINE = [
  { year: '3300-1300 BCE', event: 'Indus Valley Civilization', description: 'One of the world\'s oldest civilizations' },
  { year: '1500-500 BCE', event: 'Vedic Period', description: 'Composition of the Vedas' },
  { year: '322-185 BCE', event: 'Maurya Empire', description: 'Chandragupta Maurya & Ashoka the Great' },
  { year: '320-550 CE', event: 'Gupta Empire', description: 'Golden Age of Indian culture' },
  { year: '1526-1857', event: 'Mughal Empire', description: 'Islamic rule, architectural marvels' },
  { year: '1857', event: 'First War of Independence', description: 'Revolt against British rule' },
  { year: '1885', event: 'Indian National Congress Founded', description: 'Beginning of organized freedom movement' },
  { year: '1947', event: 'Independence', description: 'India gains freedom from British rule' },
  { year: '1950', event: 'Republic Day', description: 'Constitution of India comes into effect' },
]

export default function Timeline() {
  return (
    <div className="min-h-screen bg-green-300 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-8 border-8 border-black bg-white p-6 uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block">
          📅 Historical Timeline
        </h1>

        <div className="space-y-6">
          {TIMELINE.map((item, idx) => (
            <div
              key={idx}
              className="border-8 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all"
            >
              <div className="flex gap-6">
                <div className="border-4 border-black bg-orange-200 p-4 min-w-[200px] text-center">
                  <p className="text-2xl font-bold uppercase">{item.year}</p>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold uppercase mb-2 border-b-4 border-black pb-2">{item.event}</h2>
                  <p className="text-lg font-bold">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
