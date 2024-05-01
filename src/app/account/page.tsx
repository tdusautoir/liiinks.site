"use client";

import Header from "@/components/header/header";
import React, { Fragment, ReactNode, useState } from "react";
import style from "./account.module.scss";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Profile from "./_profile";
import Links from "./_links";
import MySpace from "./_my-space";

type Steps = {
    [key: string]: ReactNode;
}

type ButtonLabels = {
    [key: string]: string;
}

type StepsType<T extends Steps> = keyof T;


export default function Account() {
    const [step, setStep] = useState<StepsType<typeof steps>>("profile");

    const handleStepChange = (newStep: StepsType<typeof steps>) => {
        setStep(newStep);
    };

    const steps = {
        "profile": <Profile />,
        "links": <Links />,
        "my-space": <MySpace />,
    };

    const buttonLabels: ButtonLabels = {
        "profile": "Profil",
        "links": "Mes liens",
        "my-space": "Mon espace",
    };

    return (
        <Fragment>
            <Header />
            <main className={style.container}>
                <div className={style.head}>
                    <h1>Paramètres</h1>
                    <p>Gérer les paramètres de votre compte et modifier la liste de vos liens.</p>
                </div>
                <Separator />
                <div className={style.content}>
                    <div className={style.menu}>
                        {Object.keys(steps).map((key) => (
                            <Button
                                key={key}
                                size="sm"
                                variant={step === key ? "secondary" : "link"}
                                onClick={() => handleStepChange(key as StepsType<typeof steps>)}
                            >{buttonLabels[key]}</Button>
                        ))}
                    </div>
                    {steps[step]}
                </div>
            </main>
        </Fragment>
    );
}
