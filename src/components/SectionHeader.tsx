export default function MainHeader({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-8 text-center">
      <div className="mb-4 text-green-300">
        ════════════════════════════════════════════════════════════════
      </div>
      <div className="mb-2 text-green-300 text-xl tracking-wider">
        ╔══════════════════════════════════════════════════════════╗
      </div>
      <div className="mb-2 text-green-300 text-xl tracking-wider">
        ║ {title.toUpperCase()} ║
      </div>
      <div className="mb-4 text-green-300 text-xl tracking-wider">
        ╚══════════════════════════════════════════════════════════╝
      </div>
      <div className="mb-4 text-green-500 text-sm">{children}</div>
      <div className="text-green-300">
        ════════════════════════════════════════════════════════════════
      </div>
    </div>
  )
}
