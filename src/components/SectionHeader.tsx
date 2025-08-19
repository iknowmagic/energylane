import { genLine } from '@/utils'

export default function MainHeader({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-8 text-center">
      <div className="mb-2 text-green-300 text-xl tracking-wider">
        <span className="md:hidden">╔{genLine(20)}╗</span>
        <span className="hidden md:block">╔{genLine(58)}╗</span>
      </div>
      <div className="mb-2 text-green-300 text-xl tracking-wider">
        ║ {title.toUpperCase()} ║
      </div>
      <div className="mb-4 text-green-300 text-xl tracking-wider">
        <span className="md:hidden">╚{genLine(20)}╝</span>
        <span className="hidden md:block">╚{genLine(58)}╝</span>
      </div>
      <div className="mb-4 text-green-500 text-sm">{children}</div>
      <div className="text-green-300">
        <span className="md:hidden">{genLine(35)}</span>
        <span className="hidden md:block">{genLine(64)}</span>
      </div>
    </div>
  )
}
