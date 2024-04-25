import Image from "next/image";
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebook, FaReddit } from "react-icons/fa6";
import { SiOnlyfans } from "react-icons/si";


export default function Reseaux(src, width, height, alt, lien, icon) {
    return (
        <a href={lien}>
            {icon === 'twitter' || icon === 'Twitter' || icon === 'X' && <FaTwitter/>}
            {icon === 'linkedin' || icon === 'Linkedin' && <FaLinkedin/>}
            {icon === 'instagram' || icon === 'Instagram' && <FaInstagram/>}
            {icon === 'facebook' || icon === 'Facebook' && <FaFacebook/>}
            {icon === 'reddit' || icon === 'Reddit' && <FaReddit/>}
            {icon === 'onlyfans' || icon === 'Onlyfans' && <SiOnlyfans/>}
            <Image src={src} width={width} height={height} alt={alt} />
        </a>
    );
}