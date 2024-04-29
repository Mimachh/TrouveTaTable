import { Link, Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/Components/ui/button';
import { motion } from 'framer-motion';

type WelcomeProps = PageProps & {
    restaurant: any;
};

export default function Welcome({ auth, restaurant }: WelcomeProps) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };
    // https://www.youtube.com/watch?v=jcpLprT5F0I
    return (
        <>
            <Head title="Welcome" />
            <div className='min-h-screen bg-foreground/90 flex items-center justify-center'>
                <motion.button
                className='px-8 py-5 rounded-md relative
                radial-gradient
                '
                initial={{
                    "--x": "100%",
                }}
                animate={{
                    "--x": "-100%",
                }}
                whileTap={{
                    scale: 0.97
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 1,
                    type: "spring",
                    stiffness: 20,
                    damping: 15,
                    mass: 2,
                    scale: {
                        type: "spring",
                        stiffness: 10,
                        damping: 5,
                        mass: 0.1
                    }
                }}
                onClick={() => {
                    router.visit('/reservation/' + restaurant.id);
                }}
                >
                    <span
                    className='text-neutral-100 tracking-wide font-light
                    h-full w-full block relative linear-mask
                    '
                    >Réserver au {restaurant.name}</span>
                    <span className='block absolute inset-0 rounded-md p-px linear-overlay' />
                </motion.button>
            </div>
        </>
    );
}
