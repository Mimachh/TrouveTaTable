import NewsletterForm from "@/Components/welcome/newsletter/NewsletterForm";
import ToastProvider from "@/providers/ToastProvider";
import { Link, router } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

const data = [
    {
        date: "2024-05-24",
        formatDate: "May 24, 2024",
        goal: "Catalyst: Application layouts, navigation menus, description lists, and more",
        body: [
            {
                content: `We just published the first major update to Catalyst since releasing the development preview, with two new application layouts, navbar and sidebar components, description lists, and more. Here's a complete list of all the new components, available in both JavaScript and TypeScript:`,
            },
            {
                content: `We just published the first major update to Catalyst since releasing the development preview, with two new application layouts, navbar and sidebar components, description lists, and more. Here's a complete list of all the new components, available in both JavaScript and TypeScript:`,
            },
        ],
    },
];
const Index = () => {
    return (
        <ToastProvider>
            <main>
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-20 text-center pb-20">
                    <div className="w-full flex items-center justify-center">
                    <Link href={route('home')}
                    className=" gap-2 border w-fit flex items-center rounded-md px-3 py-1.5 hover:bg-secondary/30 transition-all"
                    >
                  
                        <span>
                            <ArrowLeft className="w-3 h-3 mr-0.5" />
                        </span>
                        <span>Retour à l'accueil</span>
                    </Link>
                    </div>
                    <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                        Changelog
                    </h1>
                    <p className="pt-5 text-neutral-600 tracking-tight">
                        Soyez tenu au courant des changements apportés à nos
                        services.
                    </p>
                    <div className="max-w-sm mx-auto">
                        <NewsletterForm />
                    </div>
                </div>
                <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    {data.map((item, index) => (
                        <section
                            key={index}
                            id={item.date}
                            aria-labelledby={`${item.date}-heading`}
                            className="md:flex"
                        >
                            <h2
                                id={`${item.date}-heading`}
                                className="pl-7 text-sm leading-6 text-slate-500 md:w-1/4 md:pl-0 md:pr-12 md:text-right"
                            >
                                <a href={`#${item.date}`}>{item.formatDate}</a>
                            </h2>
                            <div className="relative pl-7 pt-2 md:w-3/4 md:pl-12 md:pt-0 pb-16">
                                <div className="absolute bottom-0 left-0 w-px bg-slate-200 -top-3 md:top-2.5"></div>
                                <div className="absolute -left-1 -top-[1.0625rem] h-[0.5625rem] w-[0.5625rem] rounded-full border-2 border-slate-300 bg-white md:top-[0.4375rem]"></div>
                                <div className="max-w-none prose-h3:mb-4 prose-h3:text-base prose-h3:leading-6 prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600">
                                    <h3>{item.goal}</h3>
                                    {item.body.map((body, index) => (
                                        <p key={index}>{body.content}</p>
                                    ))}
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </ToastProvider>
    );
};

export default Index;
