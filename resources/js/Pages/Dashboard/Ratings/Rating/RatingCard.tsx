import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import Avis from "./Avis";
import Note from "./Note";
import { ExtendedAvis } from "@/types/avis";

interface Props {
    rating: ExtendedAvis;
}

const RatingCard = (props: Props) => {
    const { rating } = props;
    const tabs = [
        { name: "Note globale", value: "note_globale" },
        { name: "Avis", value: "avis" },
    ];
    return (
        <Card
            x-chunk="card-ratings"
            className="bg-background h-fit w-full shadow"
        >
            <Tabs defaultValue="note_globale" className="w-full">
                <CardHeader className="px-0">
                        <TabsList className="w-full bg-background h-6">
                            {tabs.map((tab, index) => (
                                <TabsTrigger
                                    key={index}
                                    className="w-full rounded-none border-b border-muted-foreground/40
                                    text-muted-foreground/40 data-[state=active]:text-primary 
                             data-[state=active]:border-primary
                            "
                                    value={tab.value}
                                >
                                    {tab.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                </CardHeader>
                <CardContent className="px-4">
                    <TabsContent value="note_globale">
                        <Note rating={rating} />
                    </TabsContent>
                    <TabsContent value="avis">
                        <Avis rating={rating} />
                    </TabsContent>
                </CardContent>
            </Tabs>
        </Card>
    );
};

export default RatingCard;
