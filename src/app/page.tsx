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
        <div className={style.herobanner}>
          <h1>Tout sur vous en un seul clic.</h1>
          <p>À travers un seul lien.</p>
          <Button asChild>
            <Link href="/sign-in" >
              Commencer<ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        <div className={style.gridContainer}>
          <div className={style.card}>
            <div className={style.gradient}></div>
            <h2>Créer</h2>
            <p>Rassemblez vos liens personnalisés en un seul endroit.</p>
          </div>
          <div className={style.card}>
            <div className={style.secondGradient}></div>
            <h2>Personnaliser</h2>
            <p>Choississez vos couleurs et vos polices d&apos;écritures pour créer vos dégradés.</p>
          </div>
          <div className={style.card}>
            <div className={style.thirdGradient}></div>
            <h2>Partager</h2>
            <p>Diffusez votre page avec vos amis et abonnés.</p>
          </div>
        </div>
      </main>
    </Fragment >
  );
}
