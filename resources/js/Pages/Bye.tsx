import { Head } from "@inertiajs/react";

const Bye = () => {
    return (
        <>
        <Head title="Compte supprimé"/>
        <div className="w-full h-screen flex items-center justify-center">
          <div className="bg-secondary border shadow rounded-lg h-[150px] p-6 flex flex-col items-center justify-center gap-3">
            <h2 className="header-title">Compte supprimé !</h2>
            <p className="text-sm text-primary/60">Nous sommes désolé de vous voir partir. <br /> A bientôt !</p>
           
            <a href="/" className="text-primaryBlue text-base font-medium">Accueil</a>
          </div>
        </div>
        </>
    );
};

export default Bye;
