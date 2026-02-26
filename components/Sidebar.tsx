'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Home, Building2, Landmark, BookOpen, MessageSquare } from 'lucide-react'
import { Button } from './ui/button'

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/museums', label: 'Museums', icon: Building2 },
  { path: '/monuments', label: 'Monuments', icon: Landmark },
  { path: '/timeline', label: 'Timeline', icon: BookOpen },
  { path: '/chat', label: 'Chat', icon: MessageSquare },
]

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="w-72 border-r-8 border-black bg-yellow-200 p-6 min-h-screen sticky top-0">
      <div className="border-6 border-black bg-white p-4 mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-bold uppercase text-center">Indian Museum</h2>
      </div>
      <nav className="space-y-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path || (item.path === '/chat' && pathname.startsWith('/chat'))
          return (
            <Button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full justify-start gap-3 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                isActive ? 'bg-orange-400 border-black' : 'bg-white'
              }`}
            >
              <Icon className="w-6 h-6" />
              {item.label}
            </Button>
          )
        })}
      </nav>
      <div className="mt-12 border-4 border-black bg-white p-4 text-center">
        <p className="text-xs font-bold uppercase">Explore Indian Heritage</p>
      </div>
    </div>
  )
}
