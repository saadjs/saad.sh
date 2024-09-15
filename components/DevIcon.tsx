import Git from './social-icons/git.svg'
import Javascript from './social-icons/javascript.svg'
import Typescript from './social-icons/typescript.svg'
import Node from './social-icons/nodejs.svg'
import Bash from './social-icons/bash.svg'
import Markdown from './social-icons/markdown.svg'
import Flutter from './social-icons/flutter.svg'
import Shell from './social-icons/shell.svg'
import GitHub from './social-icons/github.svg'
import Python from './social-icons/python.svg'
import Nest from './social-icons/nestjs.svg'
import Jest from './social-icons/jest.svg'
import Next from './social-icons/next.svg'

export const DevIconsMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Git,
  Javascript,
  Typescript,
  Node,
  Bash,
  Markdown,
  Flutter,
  Shell,
  GitHub,
  Python,
  Nest,
  Jest,
  Next,
}

function DevIcon({ icon }) {
  const Icon = DevIconsMap[icon]
  if (!Icon) return <div>Missing icon</div>

  return <Icon className="h-16 w-16 lg:h-14 lg:w-14 xl:h-24 xl:w-24" fill="currentColor" />
}

export default DevIcon
