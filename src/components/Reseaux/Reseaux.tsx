import Image from "next/image";
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebook, FaReddit } from "react-icons/fa6";
import { SiOnlyfans } from "react-icons/si";


export default function Reseaux({src, width, height, alt, lien, icone}) {
    return (
        <a href={lien} className="w-full h-full">
            {icone === 'twitter' && <FaTwitter className="w-full h-full fill-white"/>}
            {icone === 'linkedin' && <FaLinkedin className="w-full h-full fill-white"/>}
            {icone === 'instagram' && <FaInstagram className="w-full h-full fill-white"/>}
            {icone === 'facebook' && <FaFacebook className="w-full h-full fill-white"/>}
            {icone === 'reddit' && <FaReddit className="w-full h-full fill-white"/>}
            {icone === 'onlyfans' && <SiOnlyfans className="w-full h-full fill-white"/>}
            <Image src={src} width={width} height={height} alt={alt} />
        </a>
    );
}