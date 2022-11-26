import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useState } from "react";


export function Navbar() {
    const [active, setActive] = useState(0);
    return <nav>
        {/* <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href={"/"}>
                <div style={{ display: "flex", alignItems: "center", fontWeight: "bold", gap: 2 }}>
                    <Image src={"/icons/icon-96x96.png"} width={30} height={30} alt="logo" />
                    <h2>Home</h2>
                </div>
            </Link>
            <Link href={"/products"}>Products page</Link>
            <Link href="/.well-known/assetlinks.json">assetslinks</Link>

        </div> */}

        <ul style={{ display: "flex", justifyContent: "space-evenly", position: "fixed", left: 0, right: 0, bottom: 0, boxShadow: "0px -4px 8px rgba(0,0,0,0.15)", padding: "8px 0", margin: 0, listStyle: "none", background:"white" }} >
            {navItems && navItems?.map((item, index) => (
                <Link key={index} href={item.path}><li className="flex flex-col justify-center" style={{ transition: "all 1s ease-in-out", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", cursor: "pointer" }} onClick={() => setActive(index)}>
                    <div style={{ margin: "auto" }}>
                        <Image src={active === index ? item.activeImgUrl : item.inactiveImgUrl} width={35} height={35} alt={item.title} className="m-auto" />
                    </div>
                    <p style={{ margin: 0, color: `${active === index ? "black" : "gray"}` }}>{item.title}</p>
                    <span style={{ display: "inline-block", height: "4px", background: "green", borderRadius: "4px", visibility: `${active === index ? "visible" : "hidden"}` }} className={`w-full inline-block h-1 bg-primary-color rounded-sm ${active === index ? "visible" : "invisible"}`}></span>
                </li>
                </Link>
            ))}

        </ul>

    </nav>
}




const navItems = [
    {
        title: "Home",
        activeImgUrl: "/icons/home-active.svg",
        inactiveImgUrl: "/icons/home-inactive.svg",
        path: "/"

    },
    {
        title: "Offerings",
        activeImgUrl: "/icons/offerings-active.svg",
        inactiveImgUrl: "/icons/offerings-inactive.svg",
        path: "/offerings"
    },
    {
        title: "Grow",
        activeImgUrl: "/icons/grow-active.svg",
        inactiveImgUrl: "/icons/grow-inactive.svg",
        path: "/grow"
    },
    {
        title: "Reports",
        activeImgUrl: "/icons/reports-active.svg",
        inactiveImgUrl: "/icons/reports-inactive.svg",
        path: "/reports"
    },
    {
        title: "Profile",
        activeImgUrl: "/icons/profile-active.svg",
        inactiveImgUrl: "/icons/profile-inactive.svg",
        path: "/profile"
    },
]