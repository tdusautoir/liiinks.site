"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import style from "../auth.module.scss"
import Link from "next/link"

const formSchema = z.object({
    email: z.string().min(1, {
        message: "E-mail is required.",
    }).max(50, {
        message: "E-mail must be at most 50 characters.",
    }),
    password: z.string().min(1, {
        message: "Password is required.",
    }).max(50, {
        message: "Password must be at most 50 characters.",
    })
})

export function SignInForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
    }

    return (
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
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" size="sm" variant="link" asChild>
                    <Link href="/sign-up">
                        Pas de compte ?
                    </Link>
                </Button>
                <div className={style.buttons}>
                    <Button type="submit" size="sm">Se connecter</Button>
                </div>
            </form>
        </Form >
    )
}

export default function SignInPage() {
    return (
        <main className={style.container}>
            <SignInForm />
        </main>
    )
}