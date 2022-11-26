import React, { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: ReactNode }) => {

    return <>
        <Navbar />
        {children}
    </>

}