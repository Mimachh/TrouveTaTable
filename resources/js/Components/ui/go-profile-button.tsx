import React from 'react'
import { Button } from './button'
import { router } from '@inertiajs/react'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react';

interface Props {
    className?: string;
}
const GoProfileButton = (props: Props) => {
    const { className } = props;
  return (
    <Button 
    onClick={() => {
        router.visit(route('profile.edit'))
    }}
    variant={"default"} className={cn("px-5 rounded-full text-muted/90 dark:text-white bg-neutral-800", className)} type="button">
        <span>Mon profil</span>
        <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  )
}

export default GoProfileButton