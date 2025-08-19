import { useNavigate } from '@tanstack/react-router'

interface MenuItemProps {
  location: string
  number: number
  title: string
  description: string
  children: React.ReactNode
}

export function MenuItem({
  location,
  number,
  title,
  description,
  children,
}: MenuItemProps) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate({ to: location })}
      className="group hover:bg-opacity-30 block w-full border border-green-600 p-3 text-left transition-colors duration-200 hover:bg-green-900"
    >
      <div className="flex items-center">
        <span className="mr-4 font-bold text-green-300">[{number}]</span>
        <div className="flex-1">
          <div className="text-base tracking-wide text-green-400 group-hover:text-green-200">
            ► {title}
          </div>
          <div className="mt-1 text-xs text-green-600">{description}</div>
        </div>
        <div className="ml-4 text-green-600">{children}</div>
      </div>
    </button>
  )
}
