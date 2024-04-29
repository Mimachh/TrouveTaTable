import { User } from "@/types";

export const isRole = (user: User, role_slug: string) => {
    return user.roles.some(role => role.slug === role_slug);
};
