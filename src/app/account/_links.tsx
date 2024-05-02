import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EllipsisVertical, PenBox, Trash } from "lucide-react"
import { useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LinksType } from "@/lib/db/links"
import { DialogTrigger } from "@radix-ui/react-dialog"

const socialsFormSchema = z.object({
    twitter: z.string().url({
        message: "Veuillez entrer une URL valide",
    }).optional(),
    facebook: z.string().url({
        message: "Veuillez entrer une URL valide",
    }).optional(),
    linkedin: z.string().url({
        message: "Veuillez entrer une URL valide",
    }).optional(),
    behance: z.string().url({
        message: "Veuillez entrer une URL valide",
    }).optional(),
    instagram: z.string().url({
        message: "Veuillez entrer une URL valide",
    }).optional(),
})

const customLinkSchema = z.object({
    url: z.string().url({
        message: "Veuillez entrer une URL valide",
    }),
    label: z.string(),
})

export default function LinksPage({ link }: { link: LinksType[0] }) {
    return (
        <div className="flex">
            <Socials link={link} />
            <CustomLinks />
        </div>
    )
}

function Socials({ link }: { link: LinksType[0] }) {
    const form = useForm<z.infer<typeof socialsFormSchema>>({
        resolver: zodResolver(socialsFormSchema),
        defaultValues: {
            facebook: link.facebook ? link.facebook : undefined,
            twitter: link.twitter ? link.twitter : undefined,
            linkedin: link.linkedin ? link.linkedin : undefined,
            behance: link.behance ? link.behance : undefined,
            instagram: link.instagram ? link.instagram : undefined,
        },
    });

    function onSubmit(values: z.infer<typeof socialsFormSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-xl p-4">
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
            </form>
        </Form>
    )
}

function CustomLinks() {
    const urls = [
        { url: "https://achille-david.com", label: "Site web" },
        { url: "https://achille-david.com/portfolio", label: "Portfolio" },
        { url: "https://achille-david.com/e-commerce", label: "E-commerce" },
    ] as z.infer<typeof customLinkSchema>[];

    return (
        <div className="flex flex-col gap-4 w-full max-w-xl p-4">
            <h2>Liens personnalisés</h2>
            <p className="text-sm text-muted-foreground">Vous pouvez ajouter jusqu&apos;à 5 liens vers vos projets, site web, portfolio, etc.</p>
            {urls.map((link, key) => (
                <CustomLink key={key} link={link} />
            ))}
            <Dialog>
                <DialogTrigger asChild><Button variant="outline" className="mr-auto">Ajouter</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter un lien personnalisé</DialogTitle>
                    </DialogHeader>
                    <AddCustomLinkForm />
                </DialogContent>
            </Dialog>
        </div>
    )
}

function CustomLink({ link }: { link: z.infer<typeof customLinkSchema> }) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    return (
        <div className="flex gap-2 max-w-sm">
            <div className="w-full space-y-2">
                <p className="text-sm font-medium leading-none">{link.label}</p>
                <div className="flex gap-2">
                    <Input className="w-full" value={link.url} disabled />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="aspect-square"><EllipsisVertical className="w-4 h-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="cursor-pointer" onClick={() => setEditOpen(true)}>
                                    <PenBox className="mr-2 h-4 w-4" />
                                    <span>Modifier</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" onClick={() => setDeleteOpen(true)}>
                                    <Trash className="mr-2 h-4 w-4" />
                                    <span>Supprimer</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Modifier le lien</DialogTitle>
                            </DialogHeader>
                            <CustomLinkForm link={link} />
                        </DialogContent>
                    </Dialog>
                    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                <AlertDialogDescription>Vous êtes sur le point de supprimer un lien. Cette action est irréversible.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction className={buttonVariants({ variant: "destructive" })}>Supprimer</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    )
}

function CustomLinkForm({ link }: { link: z.infer<typeof customLinkSchema> }) {
    const form = useForm<z.infer<typeof customLinkSchema>>({
        resolver: zodResolver(customLinkSchema),
        defaultValues: {
            url: link.url,
            label: link.label,
        },
    });

    function onSubmit(values: z.infer<typeof customLinkSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Libellé</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button className="w-fit">Enregistrer</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

function AddCustomLinkForm() {
    const form = useForm<z.infer<typeof customLinkSchema>>({
        resolver: zodResolver(customLinkSchema),
        defaultValues: {
            url: "",
            label: "",
        },
    });

    function onSubmit(values: z.infer<typeof customLinkSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Libellé</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button className="w-fit">Ajouter</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}