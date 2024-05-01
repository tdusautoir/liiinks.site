import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Lock } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    firstname: z.string().min(1, {
        message: "Le prénom est obligatoire.",
    }).max(50, {
        message: "Le prénom doit contenir au plus 50 caractères.",
    }),
    lastname: z.string().min(1, {
        message: "Le nom est obligatoire.",
    }).max(50, {
        message: "Le nom doit contenir au plus 50 caractères.",
    }),
    email: z.string().min(1, {
        message: "L'e-mail est obligatoire.",
    }).max(50, {
        message: "Le nom doit contenir au plus 50 caractères.",
    }),
    bio: z.string().min(1, {
        message: "La biographie est obligatoire.",
    }).max(255, {
        message: "La biographie doit contenir au plus 255 caractères.",
    })
})

export default function Profile() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "Achille",
            lastname: "David",
            email: "davidachille18@gmail.com",
            bio: "Développeur web et mobile, passionné par la technologie et le design.",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 flex-col max-w-xl p-4">
                <h2>Profil</h2>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="inline-flex"><Lock className="mr-1 h-3 w-3" />E-mail</FormLabel>
                            <FormControl>
                                <Input {...field} disabled />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Biographie</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Dîtes-en plus sur vous" {...field} className="resize-none" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-fit">Enregistrer les modifications</Button>
            </form>
        </Form>
    )
}