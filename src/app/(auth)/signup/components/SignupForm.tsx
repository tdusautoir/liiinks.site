"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

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

export function SignupForm() {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                                <Input placeholder="Thibaut" {...field} />
                            </FormControl>
                            <FormDescription>
                                Votre prénom sera affiché publiquement.
                            </FormDescription>
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
                                <Input placeholder="Dusautoir" {...field} />
                            </FormControl>
                            <FormDescription>
                                Votre nom sera affiché publiquement.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="thibautdusautoir@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">S&apos;enregister</Button>
            </form>
        </Form>
    )
}
