import Header from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Fragment } from "react";
import style from "./home.module.scss"
import Link from "next/link";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <main className={style.container}>
        <h1>Everything you are.<br />In one, simple link in bio.</h1>
        <p>Create a page with everything about you in one link. Share it with your friends and followers.</p>
        <Button asChild><Link href="/sign-in" >Get started</Link></Button>
      </main>
    </Fragment >
  );
}
