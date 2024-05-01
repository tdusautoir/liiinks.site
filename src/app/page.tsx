import Header from "@/components/header/header";
import { Fragment } from "react";
import style from "./home.module.scss";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <main className="p-4 pt-14">
        <ul className="flex flex-col gap-2">
          <li>
            <Button asChild>
              <Link href="/achille">Voir le profil d&apos;achille</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href="/thibaut">Voir le profil de thibaut</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href="/matthys">Voir le profil de matthys</Link>
            </Button>
          </li>
        </ul>
      </main>
    </Fragment >
  );
}
