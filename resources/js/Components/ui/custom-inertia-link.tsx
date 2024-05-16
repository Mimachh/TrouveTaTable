import { InertiaLinkProps, Link } from "@inertiajs/react";
import React, { LegacyRef } from "react";
import { ButtonProps } from "./button";

interface LinkProps extends Omit<InertiaLinkProps, 'href' | 'progress'> {
    className?: string;
    ref?: LegacyRef<HTMLAnchorElement>;
    href?: string | undefined;  // Ici, vous pouvez spécifier le nouveau type pour href
}

type CompletProps = LinkProps & Pick<ButtonProps, "size"> &
React.ComponentProps<"a"> & React.ComponentProps<"nav">;

const CustomInertiaLink = ({ className, ref, href, ...props }: CompletProps) => {
    return <Link className={className} 
    href={href ?? ""}
    ref={ref} {...props} />;
};

export default CustomInertiaLink;
