import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import { m } from "framer-motion";
import RegisterButton from "@/Components/ui/register-button";
import GoProfileButton from "@/Components/ui/go-profile-button";
import { useUser } from "@/hooks/useUser";

const Text = () => {
    const user = useUser.use.user();
    return (
        <div className="w-full px-2 md:px-4 max-w-6xl flex flex-col justify-center gap-3 md:gap-4 items-center pt-8 md:pt-12 min-h-[75vh] md:min-h-[85vh]">
            <m.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: [20, -5, 0],
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
                className="max-w-fit"
            >
                <div className="bg-white border border-neutral-900 relative rounded-full px-1 py-1 text-sm leading-2 text-foreground ring-[1px] ring-muted hover:ring-neutral-500 transition-all flex items-center gap-1">
                    <span className="uppercase text-white bg-neutral-900 py-1 rounded-full px-2 mr-1 text-xs">
                        NEW
                    </span>
                    <Link
                        href={"/changelog"}
                        className="flex items-center gap-1 dark:text-neutral-600"
                    >
                        <span>Lancement de la v1 </span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </m.div>

            <m.h1
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: [20, -5, 0],
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
                className="header-welcome text-center"
            >
                <span className="">
                    {" "}
                    Trouve ta {" "} <br />
                </span>
                <span className="relative w-fit inline-block">
                    <span className="z-1 absolute  md:translate-x-[-2px] md:translate-y-[3px] translate-x-[-1px] translate-y-[2px] text-neutral-800">
                        table
                    </span>
                    <span className="z-2 relative font-outline-2 text-white">
                        table
                    </span>
                </span>
            </m.h1>

            <m.div
                initial={{
                    opacity: 0,
                    y: -60,
                }}
                animate={{
                    opacity: 1,
                    y: [-60, 10, 0],
                }}
                transition={{
                    duration: 0.5,
                    delay: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
                className="w-full flex-wrap dark:text-muted text-center text-lg md:text-xl"
            >
                Concentrez-vous sur vos clients, pas sur la gestion.
            </m.div>

            <m.div
                initial={{
                    opacity: 0,
                    x: -30,
                }}
                animate={{
                    opacity: 1,
                    x: [-30, 10, -5, 0],
                }}
                transition={{
                    duration: 0.5,
                    delay: 0.6,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
            >
                {!user ? (
                    <RegisterButton className=" w-[210px] py-7" />
                ) : (
                    <GoProfileButton className=" w-[210px] py-7" />
                )}
            </m.div>
        </div>
    );
};

export default Text;
