import Link from "@/components/Link/Link";
import Reseaux from "@/components/Reseaux/Reseaux";
import Image from "next/image";


type ImageParams = {
    image?: string,
    alt?: string,
    lien: string,
    width?: number,
    height?: number,
    icon?: string,
}

const ImgParams: ImageParams[] = [
    {icon: 'twitter', lien:'hellofr' },
    {icon: 'instagram', lien:'hellofr' },
    {icon: 'onlyfans', lien:'hellofr' }
]

type LienParams = {
    text: string,
    position: string,
    link: string,
    label: string,
}

const LienParams: LienParams[] = [
    {text: 'Lien vers mon portfolio',position: 'none', link: 'vercel.svg', label: 'HELLO' },
    {text: 'Le jeu de la biscotte',position: 'none', link: 'vercel.svg', label: 'HELLO' },
    {text: 'Vidéo ou on mange de la boue',position: 'none', link: 'vercel.svg', label: 'HELLO' },
    {text: 'Compile des plaquages',position: 'none', link: 'vercel.svg', label: 'HELLO' },
]



export default function Card() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center gap-3">
                <Image src={'/chabal.jpg'} width={120} height={120} alt="Image de chabal" className="rounded-full border-solid border-2 border-neutral-0" />
                <div className="flex flex-col gap-1 items-center justify-center">
                    <h1 className="font-semibold text-xl text-slate-100">Sebastien chabal</h1>
                    <p className="max-w-60 text-center text-slate-100">Le rugbyman de con là</p>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {LienParams.map((params, index) => (
                    <div className="hover:scale-105 transition-all">
                        <Link key={index} icon={params.position} link={params.link} label={params.label} text={params.text} />
                    </div>
                ))}
            </div>
            <div className="flex gap-4">
                {ImgParams.map((params,index) => (
                    <div className="hover:scale-125 transition-all min-w-6 min-h-6">
                        <Reseaux key={index} src={params.image} alt={params.alt} width={params.width} height={params.height} lien={params.lien} icone={params.icon} />
                    </div>
                ))}
            </div>
        </div>
    );
}