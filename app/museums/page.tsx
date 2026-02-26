'use client'

const MUSEUMS = [
  { name: 'National Museum', location: 'New Delhi', year: '1949', specialty: 'Art, Archaeology & History', img: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/National_Museum_New_Delhi_India.jpg' },
  { name: 'Indian Museum', location: 'Kolkata', year: '1814', specialty: 'Oldest Museum in India', img: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Indian_Museum_Entrance.JPG' },
  { name: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya', location: 'Mumbai', year: '1922', specialty: 'Art & History', img: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Prince_of_Wales_Museum.jpg' },
  { name: 'Government Museum', location: 'Chennai', year: '1851', specialty: 'Archaeology & Numismatics', img: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Government_Museum_Chennai.JPG' },
  { name: 'Salar Jung Museum', location: 'Hyderabad', year: '1951', specialty: 'Art & Antiques', img: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Salar_Jung_Museum_Hyderabad.jpg' },
  { name: 'National Rail Museum', location: 'New Delhi', year: '1977', specialty: 'Railway Heritage', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/National_Rail_Museum_Delhi.jpg' },
]

export default function Museums() {
  return (
    <div className="min-h-screen bg-orange-300 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold mb-8 border-8 border-black bg-white p-6 uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block">
          🏛️ Important Museums
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MUSEUMS.map((museum, idx) => (
            <div
              key={idx}
              className="border-8 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all overflow-hidden"
            >
              <div className="border-b-8 border-black h-48 overflow-hidden">
                <img src={museum.img} alt={museum.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="border-4 border-black bg-blue-200 p-4 mb-4">
                  <h2 className="text-2xl font-bold uppercase">{museum.name}</h2>
                </div>
                <div className="space-y-2">
                  <p className="font-bold"><span className="border-b-4 border-black">Location:</span> {museum.location}</p>
                  <p className="font-bold"><span className="border-b-4 border-black">Established:</span> {museum.year}</p>
                  <p className="font-bold"><span className="border-b-4 border-black">Specialty:</span> {museum.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
