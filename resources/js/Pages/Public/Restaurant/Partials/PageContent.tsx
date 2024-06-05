import BookingButton from "@/Components/ui/booking-button";
import { Restaurant } from "@/types/restaurant";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import MenuCard from "./MenuCard";
import ContactCard from "./ContactCard";
import NewsletterCard from "./NewsletterCard";
import DescriptionCard from "./DescriptionCard";
import RatingCard from "./Rating/RatingCard";
import HoursCard from "./HoursCard";
import { AnimatePresence, m } from "framer-motion";
import { FormatedDayAndHour } from "@/types/days";
import {
    CalendarDays,
    Camera,
    CameraIcon,
    Check,
    Upload,
    X,
} from "lucide-react";
import { router, useForm } from "@inertiajs/react";
import { isImage } from "@/lib/is-image";
import { readFile } from "@/lib/read-file";
import { Button } from "@/Components/ui/button";
import { toast } from "sonner";
import { set } from "date-fns";
import { cn } from "@/lib/utils";
import SubmitButton from "@/Components/ui/submit-button";
import InputError from "@/Components/InputError";
import { Avis } from "@/types/avis";

interface Props extends CanProps {
    restaurant: Restaurant;

    hours: FormatedDayAndHour[];

    avis?: {
        data: Avis[] | null;
        links: any[];
        meta: any[]
    }
}

interface CanProps {
    can?: {
        enablePage: boolean;
        updatePage: boolean;
        updateBanner: boolean;
        updateAvatar: boolean;
        updateMedia: boolean;
    };
}
const PageContent = (props: Props) => {
    const {
        restaurant,
        hours,
        can,
        avis
    } = props;
   
    const buttonRef = useRef(null);
    const [canBook, setCanBook] = useState(restaurant.accept_reservations);
    console.log(can);
    const [lateralButton, setLateralButton] = useState(false);
    const [isMediumScreen, setIsMediumScreen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    setLateralButton(true);
                    // console.log("Le bouton a quitté l'écran");
                } else {
                    setLateralButton(false);
                    // console.log("Le bouton est visible");
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            }
        );

        if (buttonRef.current) {
            observer.observe(buttonRef.current);
        }

        return () => {
            if (buttonRef.current) {
                observer.unobserve(buttonRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMediumScreen(window.innerWidth >= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const variants = {
        close: {
            opacity: 0,
            x: 100,
            rotate: isMediumScreen ? -90 : 0,
        },
        open: {
            opacity: 1,
            x: 0,
            rotate: isMediumScreen ? -90 : 0,
        },
    };

    return (
        <>
            <main className="max-w-5xl mx-auto h-[200vh]">
                <div className="flex flex-col items-center">
                    <div className="h-full w-full relative">
                        <div className="relative w-full h-72 overflow-hidden">
                            <Banner can={can} restaurant={restaurant} />
                        </div>
                        <Avatar can={can} restaurant={restaurant} />
                    </div>
                    <div className="w-full">
                        <div
                            style={{
                                backgroundImage:
                                    "radial-gradient(200% 140% at 60% 0%, #020617 50%, hsl(var(--primary-blue)))",
                            }}
                            className="py-10 bg-gray-800 w-full"
                        >
                            <h1
                                className="text-3xl text-primary-foreground font-bold text-center tracking-wider mb-4"
                                title={`Restaurant: ${restaurant.name}`}
                            >
                                {restaurant.name}
                            </h1>
                            {canBook && (
                                <div
                                    className="w-full text-center"
                                    ref={buttonRef}
                                >
                                    <BookingButton
                                        title={`Réserver une table`}
                                        restaurant={restaurant}
                                    />
                                </div>
                            )}
                            {!canBook && (
                                <p className="text-center tracking-wide text-background text-[14px]">
                                    Les réservations en ligne ne sont pas
                                    disponibles actuellement.
                                </p>
                            )}
                        </div>

                        <Media can={can} restaurant={restaurant} />
                    </div>

                    <div className="md:grid md:grid-cols-3 gap-2 w-full mt-3">
                        <div className="md:col-span-2 space-y-2">
                            <MenuCard restaurant={restaurant} />
                            <ContactCard restaurant={restaurant} />
                            <NewsletterCard restaurant={restaurant}/>
                            <DescriptionCard restaurant={restaurant} />
                        </div>
                        <div className="w-full md:col-start-3 space-y-3">
                            <RatingCard restaurant={restaurant} avis={avis} />
                            <HoursCard hours={hours} />
                        </div>
                    </div>
                </div>
            </main>

            <AnimatePresence>
                {canBook == true && lateralButton && (
                    <m.div
                        variants={variants}
                        initial="close"
                        animate="open"
                        exit="close"
                        transition={{
                            duration: 0.4,
                            ease: "easeInOut",
                        }}
                        className="cursor-pointer hover:bg-primary/90 transition-colors fixed bottom-0 right-0 md:bottom-[40%] w-1/2 md:w-fit md:transform md:-rotate-90 md:origin-bottom-right bg-primary text-primary-foreground md:px-10 py-4 rounded-t-md"
                    >
                        <div
                            onClick={() => {
                                router.visit("/book/" + restaurant.id);
                            }}
                            className="flex items-center justify-center gap-2 tracking-tight"
                        >
                            <CalendarDays className="w-5 h-5" /> Réserver une
                            table
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PageContent;

interface AvatarProps extends CanProps {
    restaurant: Restaurant;
}
const Avatar = ({ can, restaurant }: AvatarProps) => {
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
    const [validateButton, setValidateButton] = useState(false);
    const databaseAvatar = restaurant.avatar ? restaurant.avatar : null;
    async function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            // @ts-ignore
            data.avatar = event.target.files[0];
            const myFile = event.target.files[0];
            setAvatarSrc(await readFile(myFile));
            setValidateButton(true);
        }
        event.target.value = "";
    }

    const {
        data,
        processing,
        errors,
        post,
        delete: deleteForm,
    } = useForm({
        avatar: null,
    });

    const resetAvatar = () => {
        data.avatar = null;
        setAvatarSrc(null);
        setValidateButton(false);
    };
    const deleteAvatar = () => {
        if (!can?.updateAvatar) {
            toast.error(
                "Vous n'avez pas les droits pour effectuer cette action"
            );
            return;
        }

        deleteForm(
            route("dashboard.avatar.delete", { restaurant: restaurant.id }),
            {
                preserveScroll: true,
                onSuccess: (res) => {
                    resetAvatar();
                    setValidateButton(false);
                    toast.success("Avatar supprimé.");
                },
                onError: () => {
                    toast.error("Une erreur est survenue");
                },
            }
        );
    };

    const updateAvatarPut = () => {
        if (!can?.updateAvatar) {
            toast.error(
                "Vous n'avez pas les droits pour effectuer cette action"
            );
            return;
        }

        post(
            route("dashboard.avatar.update", {
                restaurant: restaurant.id,
                data,
            }),
            {
                preserveScroll: true,
                onSuccess: (res) => {
                    resetAvatar();
                    setValidateButton(false);
                    toast.success("Avatar mis à jour avec succès");
                },
                onError: () => {
                    toast.error("Une erreur est survenue");
                },
            }
        );
    };
    return (
        <div
            className="w-[120px] h-[120px]
                            absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30px]
                            "
        >
            <div className="group relative w-full h-full rounded-full">
                <>
                    <img
                        src={
                            avatarSrc ||
                            databaseAvatar ||
                            "https://placehold.co/600/orange/white?text=Logo"
                        }
                        className="aspect-auto w-full h-full rounded-full"
                    />
                    {avatarSrc && (
                        <div
                            onClick={resetAvatar}
                            className="absolute left-2 top-2 cursor-pointer bg-destructive rounded-full p-1"
                        >
                            <X className="w-4 h-4 relative text-primary-foreground" />
                        </div>
                    )}
                    {can?.updateAvatar &&
                        restaurant.avatar &&
                        !validateButton && (
                            <div className="flex justify-center items-center opacity-0 group-hover:opacity-60 group-hover:transition-all absolute inset-0 bg-primary rounded-full">
                                <Button
                                    type="button"
                                    disabled={processing}
                                    variant="ghost"
                                    className="px-1 py-0.5"
                                    onClick={deleteAvatar}
                                >
                                    <X className="w-5 h-5 text-destructive" />
                                </Button>
                            </div>
                        )}
                </>
                {can && can.updateAvatar && can.updatePage && (
                    <div className="absolute right-2 top-2 ">
                        {validateButton ? (
                            <Button
                                className="py-0 px-0 h-fit p-1 rounded-full text-primary-foreground"
                                variant={"primaryBlue"}
                                type="button"
                                disabled={processing}
                                onClick={updateAvatarPut}
                            >
                                <Check className="w-4 h-4" />
                            </Button>
                        ) : (
                            <div className="cursor-pointer bg-green-500 rounded-full p-1">
                                {/* <div className="relative w-fit h-fit cursor-pointer bg-green-500 rounded-full p-1"> */}
                                <Camera className="w-4 h-4 relative text-primary-foreground" />
                                <input
                                    onChange={handleAvatarChange}
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                {/* </div> */}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const Banner = ({ can, restaurant }: AvatarProps) => {
    const {
        data,
        post,
        delete: deleteForm,
        processing,
    } = useForm({
        banner: null,
    });

    const [bannerSrc, setBannerSrc] = useState<string | null>(null);
    const [displayFormButton, setDisplayFormButton] = useState(false);

    const handleBanner = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const myFile = event.target.files[0];
            // @ts-ignore
            data.banner = event.target.files[0];
            setBannerSrc(await readFile(myFile));
            setDisplayFormButton(true);
        }
        event.target.value = "";
    };

    const resetBanner = () => {
        data.banner = null;
        setBannerSrc(null);
        setDisplayFormButton(false);
    };

    const deleteBanner = () => {
        if (!can?.updateAvatar) {
            toast.error(
                "Vous n'avez pas les droits pour effectuer cette action"
            );
            return;
        }

        deleteForm(
            route("dashboard.banner.delete", { restaurant: restaurant.id }),
            {
                preserveScroll: true,
                onSuccess: (res) => {
                    resetBanner();
                    setDisplayFormButton(false);
                    toast.success("Bannière supprimée.");
                },
                onError: () => {
                    toast.error("Une erreur est survenue");
                    resetBanner();
                },
            }
        );
    };

    const updateBanner = () => {
        if (!can?.updateBanner) {
            toast.error(
                "Vous n'avez pas les droits pour effectuer cette action"
            );
            return;
        }
        post(
            route("dashboard.banner.update", {
                restaurant: restaurant.id,
                data,
            }),
            {
                preserveScroll: true,
                onSuccess: (res) => {
                    setDisplayFormButton(false);
                    toast.success("Bannière mise à jour avec succès");
                },
                onError: () => {
                    toast.error("Une erreur est survenue");
                },
            }
        );
    };
    return (
        <div className="group w-full h-full relative">
            {can?.updateBanner && restaurant.banner && !displayFormButton && (
                <div
                    className="
                flex justify-center items-center
                opacity-0 group-hover:opacity-70 transition-opacity absolute inset-0 bg-primary"
                >
                    <Button
                        onClick={deleteBanner}
                        className=""
                        disabled={processing}
                        variant={"destructive"}
                    >
                        <X className="w-7 h-7" />
                    </Button>
                </div>
            )}
            <img
                src={
                    bannerSrc ||
                    restaurant.banner ||
                    "https://placehold.co/600/orange/white?text=Logo"
                }
                className="h-auto w-full aspect-auto object-contain"
            />
            {can && can.updateBanner && can.updatePage && (
                <div className="absolute right-1 top-1">
                    {displayFormButton ? (
                        <>
                            <Button
                                type="button"
                                disabled={processing}
                                variant={"destructive"}
                                onClick={resetBanner}
                            >
                                Annuler
                            </Button>
                            <Button
                                disabled={processing}
                                onClick={updateBanner}
                                type="button"
                                className="text-white"
                                variant={"primaryBlue"}
                            >
                                Valider
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button className="relative" variant={"outline"}>
                                <span>Changer la bannière</span>
                                <input
                                    onChange={handleBanner}
                                    type="file"
                                    className="absolute inset-0 opacity-0"
                                />
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

const Media = ({ can, restaurant }: AvatarProps) => {
    const [files, setFiles] = useState<
        { id: number | null; src: string; file: File }[]
    >([]);
    const [displayButton, setDisplayButton] = useState<boolean>(false);
    const {
        data,
        post,
        delete: deleteMediaForm,
        processing,
        errors,
    } = useForm({
        attachments: [] as File[],
    });

    const handleMedia = async (event: ChangeEvent<HTMLInputElement>) => {
        setDisplayButton(true);
        if (event.target.files) {
            const myFile = event.target.files[0];
            const fileAsString = await readFile(myFile);
            // @ts-ignore
            setFiles((prevFiles) => [
                ...prevFiles,
                { id: null, src: fileAsString, file: myFile },
            ]);
            // @ts-ignore
        }
        event.target.value = "";
    };

    const cancelMedia = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
    };

    const deleteMediaFromDB = ({ id }: { id: number }) => {
        if (!can?.updateMedia) {
            toast.error(
                "Vous n'avez pas les droits pour effectuer cette action"
            );
            return;
        }

        deleteMediaForm(
            route("dashboard.media.delete", {
                restaurant: restaurant.id,
                id: id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Media supprimé.");
                },
                onError: () => {
                    toast.error("Une erreur est survenue");
                },
            }
        );
    };
    const resetMedia = () => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== null));
        setDisplayButton(false);
    };

    const saveMedia = () => {
        data.attachments = files.map((file) => file.file);
        if (!can?.updateMedia) {
            toast.error(
                "Vous n'avez pas les droits pour effectuer cette action"
            );
            return;
        }
        post(
            route("dashboard.media.update", {
                restaurant: restaurant.id,
                data,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setDisplayButton(false);
                    setFiles([]);
                    toast.success("Bannière mise à jour avec succès");
                },
                onError: () => {
                    // console.log(error);
                    toast.error("Une erreur est survenue");
                },
            }
        );
    };

    return (
        <div className={cn(displayButton && "border p-2 space-y-2")}>
            <div className="grid grid-cols-5">
                <>
                    {restaurant.medias &&
                        restaurant.medias.map((media, index) => {
                            return (
                                <div
                                    key={index}
                                    className="h-auto w-full relative"
                                >
                                    <img
                                        src={media.path}
                                        alt={restaurant.name}
                                        className="aspect-auto w-full h-full object-contain"
                                    />
                                    {can?.updatePage && can?.updateMedia && (
                                        <X
                                            onClick={() => {
                                                deleteMediaFromDB({
                                                    id: media.id,
                                                });
                                            }}
                                            className="text-white hover:bg-muted-foreground/90 bg-muted-foreground cursor-pointer w-4 h-4 absolute top-0 right-0"
                                        />
                                    )}
                                </div>
                            );
                        })}
                </>
                {files &&
                    files.map((file, index) => {
                        const attachmentErrorKey =
                            `attachments.${index}` as keyof Partial<
                                Record<"attachments", string>
                            >;
                        return (
                            <div key={index} className="h-auto w-full relative">
                                <img
                                    src={file.src}
                                    alt={restaurant.name}
                                    className="aspect-auto w-full h-full object-contain"
                                />
                                {can?.updatePage && can?.updateMedia && (
                                    <X
                                        onClick={() => {
                                            cancelMedia(index);
                                        }}
                                        className="text-white hover:bg-muted-foreground/90 bg-muted-foreground cursor-pointer w-4 h-4 absolute top-0 right-0"
                                    />
                                )}

                                <InputError
                                    message={errors[attachmentErrorKey]}
                                    className="mt-2 font-semibold"
                                />
                            </div>
                        );
                    })}

                {can?.updateMedia && (
                    <>
                        {((!files && !restaurant.medias) ||
                            (files ? files.length : 0) +
                                (restaurant.medias
                                    ? restaurant.medias.length
                                    : 0) <
                                5) && (
                            <UploadFileInput handleMedia={handleMedia} />
                        )}
                    </>
                )}
            </div>
            {displayButton && (
                <div className="bg-secondary w-full flex items-center gap-3 justify-center py-2">
                    <Button
                        onClick={resetMedia}
                        disabled={processing}
                        type="button"
                    >
                        Annuler
                    </Button>
                    <SubmitButton
                        disabled={processing}
                        onClick={saveMedia}
                        type="button"
                        variant={"outline"}
                    >
                        Enregistrer
                    </SubmitButton>
                </div>
            )}
        </div>
    );
};

const UploadFileInput = ({
    handleMedia,
}: {
    handleMedia: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex justify-center border border-dashed border-gray-900/25 min-h-36 h-full w-full items-center">
                <div className="text-center w-full">
                    <CameraIcon
                        className="mx-auto h-8 w-8 text-gray-300"
                        aria-hidden="true"
                    />
                    <div className="mt-2 flex text-sm leading-6 text-gray-600 text-center">
                        <label
                            htmlFor="file-upload"
                            className="flex items-center justify-center w-full relative cursor-pointer rounded-md  font-semibold"
                        >
                            <Upload className="w-7 h-7 text-primaryBlue mb-2" />
                            <input
                                onChange={handleMedia}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                            />
                        </label>
                    </div>
                    <p className="text-xs flex-wrap text-center leading-5 text-muted-foreground">
                        PNG, JPG, WEBP jusqu'à 1Go
                    </p>
                </div>
            </div>
        </div>
    );
};
