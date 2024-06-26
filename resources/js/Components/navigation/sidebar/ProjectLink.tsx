import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@heroicons/react/24/outline"

interface Props {
  children: React.ReactNode
  name: string
  setSelectedProject: (val: string | null) => void
  className?: string;
  active?: boolean
}

const ProjectLink = ({ children, name, setSelectedProject, className, active = false }: Props) => {
  const handleClick = () => {
    setSelectedProject(null)
    setTimeout(() => {
      setSelectedProject(name)
    }, 250)
  }
  return (
    <a
      href="#"
      onClick={handleClick}
      className={cn("flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-primary/20 transition-colors duration-100", className, active && "stroke-muted text-muted bg-secondary-foreground/80")}
    >
      {children}
      <div className="flex overflow-clip place-items-center justify-between w-full">
        <p className="text-inherit truncate whitespace-nowrap tracking-wide">
          {name}
        </p>
        <ChevronRightIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
      </div>
    </a>
  )
}

export default ProjectLink