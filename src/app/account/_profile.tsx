import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Lock } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UsersType } from "@/lib/db/userHelper"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { toastErrorProperties, toastSuccessProperties } from "@/components/ui/toast"

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
    username: z.string().min(1, {
        message: "Le nom d'utilisateur est obligatoire.",
    }).max(50, {
        message: "Le nom d'utilisateur doit contenir au plus 50 caractères.",
    }),
    avatar: z.string().optional(),
    bio: z.string().max(255, {
        message: "La biographie doit contenir au plus 255 caractères.",
    }).optional()
})

export default function Profile({ user }: { user: UsersType[0] }) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            bio: user.bio,
            avatar: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);

        try {
            const res = await fetch("/api/account/profile", {
                method: "PUT",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            setLoading(false);

            const result = await res.json();

            if (res.ok) {
                if (result.user.changeUsername) {
                    toast({
                        title: "Votre profil a été mis à jour avec succès. Votre liiink va être mis à jour dans quelques instants.",
                        ...toastSuccessProperties
                    })
                } else {
                    toast({
                        title: "Votre profil a été mis à jour avec succès.",
                        ...toastSuccessProperties
                    })
                }
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
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 flex-col max-w-xl p-4 pt-0">
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
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="inline-flex">Username</FormLabel>
                            <FormControl>
                                <Input {...field} />
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
                    name="avatar"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Avatar</FormLabel>
                            <FormControl>
                                <Input type="file" accept="image/png,image/jpeg,image/jpg," {...field} className="cursor-pointer" />
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
                <Button disabled={loading} className="w-fit" type="submit">
                    {loading ? <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Chargement...
                    </> : "Emregistrer les modifications"}
                </Button>
            </form>
        </Form>
    )
}