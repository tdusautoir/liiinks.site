import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react"

const formSchema = z.object({
    urls: z.array(z.string().min(1, {
        message: "Le lien est obligatoire.",
    })).max(5, {
        message: "Vous ne pouvez pas ajouter plus de 5 liens.",
    }),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    behance: z.string().optional(),
    instagram: z.string().optional(),

})

export default function Links() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            urls: ["https://achille.dev"],
            twitter: "https://twitter.com/achille_david",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
                <div className="flex flex-col gap-4 w-full max-w-xl p-4">
                    <h2>Réseaux sociaux</h2>
                    <FormField
                        control={form.control}
                        name="twitter"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Twitter</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="facebook"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Facebook</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>LinkedIn</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="behance"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Behance</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Instagram</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-fit">Enregistrer les modifications</Button>
                </div>
                <div className="flex flex-col gap-4 w-full max-w-xl p-4 pl-0">
                    <h2>Liens personnalisés</h2>
                    {
                        form.watch("urls").map((url, key) => (
                            <FormField
                                key={key}
                                control={form.control}
                                name={`urls.${key}`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))
                    }
                    <Button
                        type="button"
                        className="w-fit"
                        size="sm"
                        variant="outline"
                        onClick={() => form.setValue("urls", [...form.watch("urls"), ""])}
                        disabled={form.watch("urls").length >= 5}>
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter un lien
                    </Button>
                    <FormDescription>Ajoutez les liens que vous souhaitez afficher sur votre espace liiinks.</FormDescription>
                </div>
            </form>
        </Form>
    )
}