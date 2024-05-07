import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { LinksType } from "@/lib/db/linksHelper"
import { useToast } from "@/components/ui/use-toast"
import { toastErrorProperties, toastSuccessProperties } from "@/components/ui/toast"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    fontFamily: z.string(),
    backgroundColor: z.string(),
})

export default function MySpace({ link }: {
    link: Omit<LinksType[0], 'personalizedLinks'> & {
        personalizedLinks: Array<{ url: string, label: string }>
    }
}) {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fontFamily: "inter",
            backgroundColor: "#ffffff",
        },
    });
    const { toast } = useToast();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);

        try {
            const res = await fetch("/api/account/space", {
                method: "PUT",
                body: JSON.stringify({
                    ...values,
                    id: link.id
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            setLoading(false);

            const result = await res.json();

            console.log(result);

            if (res.ok) {
                toast({
                    title: "Votre liiink a été mis à jour avec succès.",
                    ...toastSuccessProperties
                })
            } else {
                toast({
                    title: result.error ? result.message : "Une erreur est survenue",
                    ...toastErrorProperties
                })
            }
        } catch (error) {
            setLoading(false);

            toast({
                title: "Une erreur est survenue",
                ...toastErrorProperties
            })
        };
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 flex-col max-w-xl p-4 pt-0">
                <h2>Mon espace</h2>
                <FormField
                    control={form.control}
                    name="fontFamily"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Police d&apos;écriture</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choisir une police" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="inter" style={{
                                        fontFamily: "var(--font-sans)"
                                    }}>Inter</SelectItem>
                                    <SelectItem value="roboto" style={{
                                        fontFamily: "var(--font-roboto)"
                                    }}>Roboto</SelectItem>
                                    <SelectItem value="pacifico" style={{
                                        fontFamily: "var(--font-pacifico)"
                                    }}>Pacifico</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Définissez la police que vous souhaitez utiliser sur votre espace liiinks.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="backgroundColor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Couleur de fond</FormLabel>
                            <Input
                                className="w-[40px] p-1.5"
                                type="color"
                                {...field}
                            />
                            <FormDescription>
                                Définissez la couleur de fond de votre espace liiinks.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={loading} className="w-fit" type="submit">
                    {loading ? <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Chargement...
                    </> : "Emregistrer les modifications"}
                </Button>
            </form>
        </Form >
    )
}