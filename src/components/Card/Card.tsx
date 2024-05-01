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

type LienParams = {
    text: string,
    position: string,
    link: string,
    label: string,
}

const LienParams: LienParams[] = [
    {text: 'Buuuuuuuuuuutn1',position: 'none', link: 'vercel.svg', label: 'HELLO' },
    {text: 'Btn2',position: 'none', link: 'vercel.svg', label: 'HELLO' },
    {text: 'Btn3',position: 'none', link: 'vercel.svg', label: 'HELLO' },
    {text: 'Btn4',position: 'none', link: 'vercel.svg', label: 'HELLO' },
]

const ImgParams: ImageParams[] = [
    {icon: 'twitter', lien:'hellofr' },
    {icon: 'instagram', lien:'hellofr' },
    {icon: 'facebook', lien:'hellofr' }
]



export default function Card() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center gap-3">
                <Image src={'/chabal.jpg'} width={120} height={120} alt="Image de chabal" className="rounded-full border-solid border-2 border-slate-900" />
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
            <div className="flex gap-2">
                {ImgParams.map((params,index) => (
                    <Reseaux key={index} src={params.image} alt={params.alt} width={params.width} height={params.height} lien={params.lien} icon={params.icon} />
                ))}
            </div>
        </div>
    );
}