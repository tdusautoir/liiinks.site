import Image from "next/image";


export default function Link({text, icon, link, label}) {
    return (
        <a href={link} aria-label={label} className="flex gap-3 px-8 py-4 w-full items-center justify-center rounded-full bg-slate-50 min-w-56">
            {icon === 'left' && <Image src={'/next.svg'} width={40} height={40} alt="Icone bouton" />}
            <p>{text}</p>
            {icon === 'right' && <Image src={'/next.svg'} width={40} height={40} alt="Icone bouton" />}
        </a>
    );
}