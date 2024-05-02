import Header from "@/components/header/header";
import { Fragment } from "react";

export default function Auth({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <Fragment>
            <Header asMenu={false} />
            {children}
        </Fragment>
    )
}