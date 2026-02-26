'use client'

const MONUMENTS = [
  { name: 'Taj Mahal', location: 'Agra', year: '1653', type: 'Mausoleum', unesco: true, img: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg' },
  { name: 'Red Fort', location: 'Delhi', year: '1648', type: 'Fort', unesco: true, img: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Red_Fort%2C_Delhi_by_Alexey_Komarov.jpg' },
  { name: 'Qutub Minar', location: 'Delhi', year: '1220', type: 'Minaret', unesco: true, img: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Qutb_Minar_India.jpg' },
  { name: 'Gateway of India', location: 'Mumbai', year: '1924', type: 'Arch Monument', unesco: false, img: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Gateway_of_India.jpg' },
  { name: 'Hawa Mahal', location: 'Jaipur', year: '1799', type: 'Palace', unesco: false, img: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Hawa_Mahal_Jaipur_India.jpg' },
  { name: 'Mysore Palace', location: 'Mysore', year: '1912', type: 'Palace', unesco: false, img: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Mysore_Palace_India.jpg' },
  { name: 'Ajanta Caves', location: 'Maharashtra', year: '2nd Century BCE', type: 'Rock-cut Caves', unesco: true, img: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Ajanta_caves_Maharashtra.jpg' },
  { name: 'Konark Sun Temple', location: 'Odisha', year: '1250', type: 'Temple', unesco: true, img: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Konark_Temple.jpg' },
]

export default function Monuments() {
  return (
    <div className="min-h-screen bg-yellow-300 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold mb-8 border-8 border-black bg-white p-6 uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block">
          🏛️ Famous Monuments
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MONUMENTS.map((monument, idx) => (
            <div
              key={idx}
              className="border-8 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all overflow-hidden"
            >
              <div className="border-b-8 border-black h-48 overflow-hidden">
                <img src={monument.img} alt={monument.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold uppercase mb-3 border-b-4 border-black pb-2">{monument.name}</h2>
                <div className="space-y-1 text-sm">
                  <p className="font-bold">📍 {monument.location}</p>
                  <p className="font-bold">📅 {monument.year}</p>
                  <p className="font-bold">🏗️ {monument.type}</p>
                  {monument.unesco && (
                    <div className="border-4 border-black bg-yellow-200 p-2 mt-3 text-center font-bold uppercase text-xs">
                      UNESCO World Heritage
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
