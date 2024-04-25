"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import style from "../auth.module.scss"

const formSchema = z.object({
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

function SignUpForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const result = res.json();

        if (res.ok) {
            console.log(result)
        } else {
            console.error(result)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <Button type="submit">Créer le compte</Button>
                </div>
            </form>
        </Form>
    )
}

export default function SignInPage() {
    return (
        <main className={style.container}>
            <SignUpForm />
        </main>
    )
}