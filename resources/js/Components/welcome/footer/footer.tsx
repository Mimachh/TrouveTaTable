import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";

const Footer = () => {
    return (
        <div>
            <div className="h-24 flex flex-col items-center justify-center w-full gap-3">
                <div>LOGO</div>
                <div>
                    <ul className="flex items-center justify-center gap-3 leading-4 text-sm text-green-800 tracking-tight">
                        <li>
                            <Button 
                            onClick={() => {
                                router.visit(route('home'))
                            }}
                            className="text-green-800"
                            variant={"link"}>Mentions légales</Button>
                         
                        </li>
                        <li>
                        <Button 
                            onClick={() => {
                                router.visit(route('changelog'))
                            }}
                            className="text-green-800"
                            variant={"link"}>Changelog</Button>
                        </li>
                        <li>
                        <Button 
                            onClick={() => {
                                router.visit(route('login'))
                            }}
                            className="text-green-800"
                            variant={"link"}>Connexion</Button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t h-12 flex items-center justify-center">
                <small>
                    © {new Date().getFullYear()} TrouveTaTable.fr - Tous droits réservés
                </small>
            </div>
        </div>
    );
};

export default Footer;
