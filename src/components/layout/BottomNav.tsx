import { NavLink } from 'react-router-dom'

const ITEMS = [
  { to: '/',        icon: '◎', label: '둘러보기' },
  { to: '/profile', icon: '○', label: '내 활동' },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-black/8
                    flex items-center pb-safe">
      {ITEMS.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-[10px] font-semibold
             transition-colors ${isActive ? 'text-black' : 'text-black/30'}`
          }
        >
          <span className="text-xl leading-none">{icon}</span>
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
