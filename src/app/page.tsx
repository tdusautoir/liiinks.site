import Card from "@/components/Card/Card";
import Header from "@/components/header/header";
import { Fragment } from "react";
import style from "./home.module.scss";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <main className={style.container}>
        <Card />
      </main>
    </Fragment >
  );
}
