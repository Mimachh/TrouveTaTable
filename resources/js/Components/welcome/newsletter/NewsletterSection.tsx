import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

const NewsletterSection = () => {
    return (
        <div className="md:-mt-20 h-[20rem] md:h-[32rem] w-full rounded-md md:bg-transparent relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4">
                <h3 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-800  text-center font-sans font-bold">
                    Newsletter
                </h3>
                
                <p></p>
                <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                   Inscrivez-vous à notre newsletter pour recevoir les dernières mises à jour et offres exclusives.
                </p>
                <div className="relative w-full ">
                <Input
                    type="text"
                    placeholder="email@gmail.com"
                    className="rounded-full border w-full  focus:ring-2 focus:ring-teal-500 relative mt-4 h-11 bg-background"
                />
                <Button
                size={"sm"}
                className="rounded-full absolute right-1 top-1/2 -translate-y-1/2"
                >Inscription</Button>
                </div>
            </div>
        </div>
    );
};

export default NewsletterSection;
