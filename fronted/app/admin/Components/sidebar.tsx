'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, SquarePlus, BookCheck, MessageCircleMore } from 'lucide-react'
import clsx from 'clsx'

type NavItem = {
  label: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: Home },
  { label: 'Write Story', href: '/admin/generateblog', icon: SquarePlus },
  { label: 'Publications', href: '/admin/bloglist', icon: BookCheck },
  { label: 'Discussions', href: '/admin/commentslist', icon: MessageCircleMore },
]

const Sidebar = () => {

  const pathname = usePathname()

  console.log("The pathname is: ",pathname)

  return (
    <aside className="w-64 h-screen bg-[#F9FAFB] p-4">

      <nav className="flex flex-col gap-2">

        {navItems.map((item) => {

          const Icon = item.icon

          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 rounded-xl px-3 py-3 transition-colors',
                isActive
                  ? 'bg-white text-[#5B4FFF] shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <div
                className={clsx(
                  'flex h-9 w-9 items-center justify-center rounded-lg',
                  isActive ? 'bg-[#EEF0FF]' : 'bg-transparent'
                )}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className={clsx(isActive ? 'text-[#5B4FFF]' : 'text-gray-500')}
                />
              </div>
              <span
                className={clsx(
                  'text-base',
                  isActive ? 'font-semibold' : 'font-medium'
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar