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
import style from "./account.module.scss"
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const themeLabels = {
    default: {
        label: "Défaut",
        buttonProps: {
            variant: undefined,
        },
    },
    orange: {
        label: "Orange",
        buttonProps: {
            variant: "secondary",
        },
    },
    green: {
        label: "Vert",
        buttonProps: {
            variant: "secondary",
        },
    },
    blue: {
        label: "Bleu",
        buttonProps: {
            variant: "secondary",
        },
    },
} as {
    [key: string]: {
        label: string,
        buttonProps?: React.ComponentProps<typeof Button>,
    }
}

const formSchema = z.object({
    font: z.string(),
    theme: z.string().optional(),
})

export default function MySpace() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            font: "inter",
            theme: "default",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choisir une police" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="inter">Inter</SelectItem>
                                    <SelectItem value="Roboto">Roboto</SelectItem>
                                    <SelectItem value="Helvetica">Helvetica</SelectItem>
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
                                    Object.keys(themeLabels).map((theme) => (
                                        <ThemeCard
                                            key={theme}
                                            theme={theme}
                                            isSelected={field.value === theme}
                                            buttonProps={themeLabels[theme].buttonProps}
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
                <Button className="w-fit">Enregistrer les modifications</Button>
            </form>
        </Form>
    )
}

function ThemeCard({ theme, isSelected, selectTheme, buttonProps }: { theme: string, isSelected: boolean, selectTheme: () => void, buttonProps?: React.ComponentProps<typeof Button> }) {
    return (
        <figure className={cn(style.theme, isSelected && style.selected, style[theme])} onClick={selectTheme}>
            <div className={style.card}>
                <Button {...buttonProps}>
                    Bouton illustratif
                </Button>
            </div>
            <Separator />
            <figcaption>{themeLabels[theme].label}</figcaption>
        </figure>
    )
}