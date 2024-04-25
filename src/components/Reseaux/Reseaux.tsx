import Image from "next/image";

export default function Reseaux(src, width, height, alt, lien) {
    return (
        <a href={lien}>
            <Image src={src} width={width} height={height} alt={alt} className="" />
        </a>
    );
}