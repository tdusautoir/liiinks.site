"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import style from "../auth.module.scss"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"
import { toastErrorProperties, toastSuccessProperties } from "@/components/ui/toast"

const formSchema = z.object({
    email: z.string().min(1, {
        message: "L'adresse email est requise.",
    }).max(50, {
        message: "L'adresse email ne doit pas dépasser 50 caractères",
    }).email({
        message: "L'adresse email doit être valide.",
    }),
})

export default function SignInForm() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);

        try {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const result = await response.json();

            if (response.ok) {
                const signin = await signIn("email", {
                    email: values.email,
                    callbackUrl: "/",
                    redirect: false
                });

                setLoading(false);

                if (signin && signin.error) {
                    throw new Error("An error occurred while signing in.");
                }

                toast({
                    description: `Un mail de connexion vous a été envoyé sur votre adresse email "${values.email}".`,
                    ...toastSuccessProperties
                })
            } else {
                setLoading(false);

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
        <main className={style.container}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button size="sm" variant="link" asChild>
                        <Link href="/sign-up">
                            Pas de compte ?
                        </Link>
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Chargement...
                        </> : "Se connecter"}
                    </Button>
                </form>
            </Form >
        </main>
    )
}