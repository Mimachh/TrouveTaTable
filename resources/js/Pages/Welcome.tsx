import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useRef } from 'react';
import DesktopNav from '@/Components/welcome/nav/DesktopNav';

type WelcomeProps = PageProps & {
    restaurant: any;
};

export default function Welcome({ auth, restaurant }: WelcomeProps) {
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const tabs = [
        { id: "Home", label: "Home" },
        { id: "About", label: "About" },
        { id: "Services", label: "Services" },
        { id: "Contact", label: "Contact" },
    ];

    return (
        <div className="min-h-[300vh] bg-background">
            <Head title="Welcome" />

            <DesktopNav
                tabs={tabs}
                sectionRefs={sectionRefs}
            />

            <div className='min-h-screen flex flex-col items-center justify-center'>
                <div id="Home" ref={el => sectionRefs.current[0] = el} className="min-h-screen">
                    HOME
                </div>
                <div id="About" ref={el => sectionRefs.current[1] = el} className="min-h-screen">
                    About
                </div>
                <div id="Services" ref={el => sectionRefs.current[2] = el} className="min-h-screen">
                    Services
                </div>
                <div id="Contact" ref={el => sectionRefs.current[3] = el} className="min-h-screen">
                    Contact
                </div>
            </div>
        </div>
    );
}
