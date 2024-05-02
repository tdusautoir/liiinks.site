import Header from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Fragment } from "react";
import style from "./home.module.scss"
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <main className={style.container}>
        <h1>Tout sur vous en un seul clic.<br />À travers un seul lien.</h1>
        <p>Rassemblez vos liens personnalisés en un seul endroit pour une expérience simplifiée.<br />Partagez-la avec vos amis et abonnés.</p>
        <Button asChild><Link href="/sign-in" >Commencer<ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
      </main>
    </Fragment >
  );
}
