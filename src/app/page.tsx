import Header from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Fragment } from "react";
import style from "./home.module.scss"
import Link from "next/link";
import { ArrowRight, CirclePlus, Link as LinkIcon, SquarePen } from "lucide-react";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <main className={style.container}>
        <div className={style.hero}>
          <h1>Tout sur vous en un seul clic.</h1>
          <p>À travers un seul lien.</p>
          <Button asChild>
            <Link href="/sign-in" >
              Commencer<ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        <div className={style.grid}>
          <article>
            <span />
            <h2 className="inline-flex items-center"><CirclePlus className="w-4 h-4 mr-2" />Créer</h2>
            <p>Rassemblez vos liens personnalisés en un seul endroit.</p>
          </article>
          <article>
            <span />
            <h2 className="inline-flex items-center"><SquarePen className="w-4 h-4 mr-2" />Personnaliser</h2>
            <p>Choississez vos couleurs et vos polices d&apos;écritures pour créer vos dégradés.</p>
          </article>
          <article>
            <span />
            <h2 className="inline-flex items-center"><LinkIcon className="w-4 h-4 mr-2" />Partager</h2>
            <p>Diffusez votre page avec vos amis et abonnés.</p>
          </article>
        </div>
      </main>
    </Fragment >
  );
}
