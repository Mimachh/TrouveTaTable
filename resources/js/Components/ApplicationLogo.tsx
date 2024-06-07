import { SVGAttributes } from 'react';
import { LogoCarotte, LogoOignon, LogoTomate } from './svg';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <LogoCarotte className='w-16 h-16 mt-2' />
    );
}
