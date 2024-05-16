import { cn } from "@/lib/utils"
import { Link } from "@inertiajs/react"

interface Props {
    children: React.ReactNode
    name: string,
    href: string,
    active: boolean
  }
  
  const NavigationLink = ({ children, name, href, active }: Props) => {
    
    return (
      
      <Link
        href={href}
        className={cn("flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-muted stroke-secondary-foreground/60 text-secondary-foreground/60 hover:text-muted place-items-center gap-3 hover:bg-secondary-foreground/80 transition-colors duration-100", 
          active && "stroke-muted text-muted bg-secondary-foreground/80"
        )}
      >
        {children}
        <p className="text-inherit font-poppins overflow-clip whitespace-nowrap tracking-wide">
          {name}
        </p>
      </Link>
    )
  }
  
  export default NavigationLink