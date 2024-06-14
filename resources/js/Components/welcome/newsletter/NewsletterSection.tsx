import NewsletterForm from "./NewsletterForm";

const NewsletterSection = () => {
 
    return (
        <div className=" h-[20rem] md:h-[32rem] w-full rounded-md bg-neutral-900 relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4">
                <h3 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-100  text-center font-sans font-bold">
                    Newsletter
                </h3>
                

                <p className="text-neutral-300 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                    Inscrivez-vous à notre newsletter pour recevoir les
                    dernières mises à jour et offres exclusives.
                </p>
              <NewsletterForm />
            </div>
        </div>
    );
};

export default NewsletterSection;
