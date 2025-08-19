export default function MainHeader({
  title,
  description,
}: {
  title: string
  description: string
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
      <div className="mb-4 text-green-500 text-sm">
        {description.toUpperCase()}
      </div>
      <div className="text-green-300">
        ════════════════════════════════════════════════════════════════
      </div>
    </div>
  )
}
