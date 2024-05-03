import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EllipsisVertical, Loader2, PenBox, Trash } from "lucide-react"
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
import { LinksType } from "@/lib/db/linksHelper"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { toastErrorProperties, toastSuccessProperties } from "@/components/ui/toast"
import { toast, useToast } from "@/components/ui/use-toast"
import style from "./account.module.scss"

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

type CustomLinkType = Array<{
    url: string,
    label: string,
}>

export default function LinksPage({ link }: {
    link: Omit<LinksType[0], 'personalizedLinks'> & {
        personalizedLinks: Array<{ url: string, label: string }>
    }
}) {
    const [personalizedLinks, setPersonalizedLinks] = useState<CustomLinkType>(link.personalizedLinks);

    const addPersonalizedLink = (link: CustomLinkType[0]) => {
        setPersonalizedLinks((prev) => [...prev, link]);
    };

    const removePersonalizedLink = (linkIndex: number) => {
        setPersonalizedLinks((prev) => [...prev.slice(0, linkIndex), ...prev.slice(linkIndex + 1)]);
    }

    const updatePersonalizedLink = (link: CustomLinkType[0], linkIndex: number) => {
        setPersonalizedLinks((prev) => [...prev.slice(0, linkIndex), link, ...prev.slice(linkIndex + 1)]);
    }

    return (
        <div className={style.links}>
            <Socials link={link} />
            <CustomLinks
                linkId={link.id}
                customLinks={personalizedLinks}
                addPersonalizedLink={addPersonalizedLink}
                updatePersonalizedLink={updatePersonalizedLink}
                removePersonalizedLink={removePersonalizedLink} />
        </div>
    )
}

function Socials({ link }: {
    link: Omit<LinksType[0], 'personalizedLinks'> & {
        personalizedLinks: Array<{ url: string, label: string }>
    }
}) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
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

    const onSubmit = async (values: z.infer<typeof socialsFormSchema>) => {
        setLoading(true);

        try {
            const res = await fetch("/api/account/links", {
                method: "PUT",
                body: JSON.stringify({
                    ...values,
                    id: link.id
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            setLoading(false);

            const result = await res.json();

            if (res.ok) {
                toast({
                    title: "Votre liiink a été mis à jour avec succès.",
                    ...toastSuccessProperties
                })
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-xl p-4 pt-0">
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
                <Button disabled={loading} className="w-fit" type="submit">
                    {loading ? <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Chargement...
                    </> : "Enregistrer les modifications"}
                </Button>
            </form>
        </Form>
    )
}

function CustomLinks({
    linkId,
    customLinks,
    addPersonalizedLink,
    updatePersonalizedLink,
    removePersonalizedLink
}: {
    linkId: string,
    customLinks: CustomLinkType,
    addPersonalizedLink: (link: CustomLinkType[0]) => void,
    updatePersonalizedLink: (link: CustomLinkType[0], linkIndex: number) => void,
    removePersonalizedLink: (linkIndex: number) => void
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col gap-4 w-full max-w-xl p-4 pt-0">
            <h2>Liens personnalisés</h2>
            <p className="text-sm text-muted-foreground">Vous pouvez ajouter jusqu&apos;à 5 liens vers vos projets, site web, portfolio, etc.</p>
            {customLinks.map((link, key) => (
                <CustomLink key={key} link={link} linkId={linkId} personalizedLinkKey={key} updatePersonalizedLink={updatePersonalizedLink} removePersonalizedLink={removePersonalizedLink} />
            ))}
            <Button variant="outline" className="mr-auto" onClick={() => setOpen(true)}>Ajouter</Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter un lien personnalisé</DialogTitle>
                    </DialogHeader>
                    <AddCustomLinkForm closeModal={() => setOpen(false)} linkId={linkId} addPersonalizedLink={addPersonalizedLink} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

function CustomLink({
    linkId,
    personalizedLinkKey,
    link,
    updatePersonalizedLink,
    removePersonalizedLink
}: {
    linkId: string,
    personalizedLinkKey: number,
    link: z.infer<typeof customLinkSchema>,
    updatePersonalizedLink: (link: CustomLinkType[0], linkIndex: number) => void,
    removePersonalizedLink: (linkIndex: number) => void
}) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const deletePersonalizedLink = async () => {
        try {
            const res = await fetch("/api/account/links/personalizedLinks", {
                method: "DELETE",
                body: JSON.stringify({
                    linkId,
                    personalizedLinkKey
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const result = await res.json();

            if (res.ok) {
                removePersonalizedLink(personalizedLinkKey);

                toast({
                    title: "Votre lien a été supprimé avec succès.",
                    ...toastSuccessProperties
                })
            } else {
                toast({
                    title: result.error ? result.message : "Une erreur est survenue",
                    ...toastErrorProperties
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

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
                            <CustomLinkForm personalizedLinkKey={personalizedLinkKey} linkId={linkId} link={link} updatePersonalizedLink={updatePersonalizedLink} closeDialog={() => setEditOpen(false)} />
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
                                <AlertDialogAction className={buttonVariants({ variant: "destructive" })} onClick={() => deletePersonalizedLink()}>Supprimer</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    )
}

function CustomLinkForm({ personalizedLinkKey, link, linkId, updatePersonalizedLink, closeDialog }: { personalizedLinkKey: number, linkId: string, link: z.infer<typeof customLinkSchema>, updatePersonalizedLink: (link: CustomLinkType[0], linkIndex: number) => void, closeDialog: () => void }) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof customLinkSchema>>({
        resolver: zodResolver(customLinkSchema),
        defaultValues: {
            url: link.url,
            label: link.label,
        },
    });

    const onSubmit = async (values: z.infer<typeof customLinkSchema>) => {
        setLoading(true);

        try {
            const res = await fetch("/api/account/links/personalizedLinks", {
                method: "PUT",
                body: JSON.stringify({
                    linkId,
                    personalizedLinkKey,
                    ...values
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            setLoading(false);

            const result = await res.json();

            if (res.ok) {
                updatePersonalizedLink(result.link, personalizedLinkKey);
                toast({
                    title: "Votre liiink a été mis à jour avec succès.",
                    ...toastSuccessProperties
                })

                closeDialog();
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
                    <Button className="w-fit" disabled={loading}>
                        {loading ? <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Chargement...
                        </> : "Enregistrer"}</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

function AddCustomLinkForm({ linkId, addPersonalizedLink, closeModal }: { linkId: string, addPersonalizedLink: (link: CustomLinkType[0]) => void, closeModal: () => void }) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof customLinkSchema>>({
        resolver: zodResolver(customLinkSchema),
        defaultValues: {
            url: "",
            label: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof customLinkSchema>) => {
        try {
            setLoading(true);
            const res = await fetch("/api/account/links/personalizedLinks", {
                method: "POST",
                body: JSON.stringify({
                    ...values,
                    linkId
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            setLoading(false);

            const result = await res.json();

            if (res.ok) {
                addPersonalizedLink(result.link);

                toast({
                    title: "Votre lien a été ajouté avec succès.",
                    ...toastSuccessProperties
                })

                closeModal();
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
                    <Button className="w-fit" disabled={loading}>
                        {loading ? <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Chargement...
                        </> : "Ajouter"}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}