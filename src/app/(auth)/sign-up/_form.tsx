"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import style from "../auth.module.scss"
import { signIn } from "next-auth/react"

const formSchema = z.object({
    username: z.string({
        message: "Votre prénom est requis.",
    }).min(2, {
        message: "Votre prénom doit contenir au moins 2 caractères.",
    }),
    firstname: z.string({
        message: "Votre prénom est requis.",
    }).min(2, {
        message: "Votre prénom doit contenir au moins 2 caractères.",
    }),
    lastname: z.string({
        message: "Votre nom est requis.",
    }).min(2, {
        message: "Votre nom doit contenir au moins 2 caractères.",
    }),
    email: z.string({
        message: "Votre email est requis.",
    }).email({
        message: "Votre email doit être valide.",
    })
})

export default function SignUpForm() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            setLoading(false);

            const result = await res.json();

            if (res.ok) {
                setDisabled(true);

                signIn("email", {
                    email: values.email,
                    callbackUrl: "/",
                    redirect: false
                });

                toast({
                    title: "Compte créé",
                    description: `Un mail de connexion vous a été envoyé sur votre adresse email "${result.email}".`,
                    style: {
                        backgroundColor: "#34D399",
                        color: "#FFFFFF",
                    },
                    duration: 4000
                })
            } else {
                toast({
                    title: result.error ? result.message : "Une erreur est survenue",
                    style: {
                        backgroundColor: "#EF4444",
                        color: "#FFFFFF",
                    },
                    duration: 4000
                })
            }
        } catch (error) {
            setLoading(false);

            toast({
                title: "Une erreur est survenue",
                style: {
                    backgroundColor: "#EF4444",
                    color: "#FFFFFF",
                },
                duration: 4000
            })
        }
    }

    return (
        <main className={style.container}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pseudo</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className={style.buttons}>
                        <Button type="button" variant="secondary" asChild>
                            <Link href="/sign-in"><ArrowLeft className="mr-2 h-4 w-4" />Se connecter</Link>
                        </Button>
                        <Button disabled={loading || disabled} type="submit">
                            {loading ? <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Chargement...
                            </> : "Créer le compte"}
                        </Button>
                    </div>
                </form >
            </Form >
        </main>
    )
}
