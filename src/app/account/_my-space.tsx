import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
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
import style from "./account.module.scss"
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const themes = {
    default: {
        label: "Défaut",
        buttonProps: {
            variant: undefined,
        },
        value: "default"
    },
    orange: {
        label: "Orange",
        buttonProps: {
            variant: "secondary",
        },
        value: "orange"
    },
    green: {
        label: "Vert",
        buttonProps: {
            variant: "secondary",
        },
        value: "green"
    },
    blue: {
        label: "Bleu",
        buttonProps: {
            variant: "secondary",
        },
        value: "blue"
    },
} as {
    [key: string]: {
        label: string,
        buttonProps?: React.ComponentProps<typeof Button>,
        value: string
    }
}

const fonts = [{
    className: "var(--font-sans)",
    label: "Inter",
    value: "inter"
},
{
    className: "var(--font-roboto)",
    label: "Roboto",
    value: "roboto"
},
{
    className: "var(--font-pacifico)",
    label: "Pacifico",
    value: "pacifico"
},
] as Array<{
    label: string,
    className: string,
    value: string
}>

const formSchema = z.object({
    font: z.string(),
    theme: z.string().optional(),
})

export default function MySpace({ link }: {
    link: Omit<LinksType[0], 'personalizedLinks'> & {
        personalizedLinks: Array<{ url: string, label: string }>
    }
}) {
    const [loading, setLoading] = useState(false);
    const [selectedFont, setSelectedFont] = useState(link.font || "inter");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            font: link.font || "inter",
            theme: link.backgroundPreset || "default",
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 flex-col p-4 pt-0">
                <div className="max-w-xl">
                    <h2>Mon espace</h2>
                    <p className="text-sm text-muted-foreground">Personnalisez votre espace en choisissant votre police d&apos;écriture et votre thème.</p>
                </div>
                <FormField
                    control={form.control}
                    name="font"
                    render={({ field }) => (
                        <FormItem className="max-w-xl">
                            <FormLabel>Police d&apos;écriture</FormLabel>
                            <Select onValueChange={(value) => {
                                setSelectedFont(value);
                                field.onChange;
                            }} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choisir une police" />
                                </SelectTrigger>
                                <SelectContent>
                                    {fonts.map((font) => (
                                        <SelectItem
                                            key={font.value}
                                            value={font.value}
                                            style={{ fontFamily: font.className }}>
                                            {font.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                        <FormItem className="max-w-4xl">
                            <FormLabel>Thème</FormLabel>
                            <div className={style.themes}>
                                {
                                    Object.keys(themes).map((theme) => (
                                        <ThemeCard
                                            key={theme}
                                            theme={theme}
                                            isSelected={field.value === theme}
                                            buttonProps={themes[theme].buttonProps}
                                            selectedFont={selectedFont}
                                            selectTheme={() => {
                                                form.setValue("theme", theme);
                                            }}
                                        />
                                    ))
                                }
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={loading} className="w-fit" type="submit">
                    {loading ? <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Chargement...
                    </> : "Enregistrer les modifications"}
                </Button>
            </form>
        </Form >
    )
}

function ThemeCard({
    theme,
    isSelected,
    selectTheme,
    selectedFont,
    buttonProps
}: {
    theme: string,
    isSelected: boolean,
    selectTheme: () => void,
    selectedFont: string,
    buttonProps?: React.ComponentProps<typeof Button>
}) {
    const font = fonts.find((f) => f.value === selectedFont);

    return (
        <figure className={cn(style.theme, isSelected && style.selected, style[theme])} onClick={selectTheme}>
            <div className={style.card}>
                <Button type="button" {...buttonProps} style={{
                    fontFamily: font?.className
                }}>
                    Bouton illustratif
                </Button>
            </div>
            <Separator />
            <figcaption>{themes[theme].label}</figcaption>
        </figure>
    )
}