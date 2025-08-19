import { genLine } from '@/utils'

export default function MainHeader({ title }: { title: string }) {
  return (
    <div className="mb-6 text-center">
      <div className="text-green-300 text-lg tracking-wider">
        <span className="md:hidden">╔{genLine(20)}╗</span>
        <span className="hidden md:block">╔{genLine(60)}╗</span>
      </div>
      <div className="text-green-300 text-lg">║ {title.toUpperCase()} ║</div>
      <div className="text-green-300 text-lg tracking-wider">
        <span className="md:hidden">╚{genLine(20)}╝</span>
        <span className="hidden md:block">╚{genLine(60)}╝</span>
      </div>
    </div>
  )
}
