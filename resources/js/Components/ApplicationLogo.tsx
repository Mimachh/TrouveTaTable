import { SVGAttributes } from 'react';
import { LogoShort } from './svg';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <LogoShort className='w-16 h-16 mt-2' />
    );
}
