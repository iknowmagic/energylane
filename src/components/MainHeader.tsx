import { genLine } from '@/utils'

export default function MainHeader({ title }: { title: string }) {
  return (
    <div className="mb-6 text-center">
      <div className="text-lg tracking-wider text-green-300">
        <span className="md:hidden">╔{genLine(20)}╗</span>
        <span className="hidden md:block">╔{genLine(60)}╗</span>
      </div>
      <div className="text-lg text-green-300">║ {title.toUpperCase()} ║</div>
      <div className="text-lg tracking-wider text-green-300">
        <span className="md:hidden">╚{genLine(20)}╝</span>
        <span className="hidden md:block">╚{genLine(60)}╝</span>
      </div>
    </div>
  )
}
