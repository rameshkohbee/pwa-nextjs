import React, { useCallback, useState } from "react";
import { Text } from "@components/text";
import { NavigationBar } from "@components/navigation-bar";

export default function Navbar(): JSX.Element {
    const [active, setActive] = useState(0);

    const handleActiveTab = useCallback(
        (value) => {
            setActive(value);
        },
        [active],
    );

    return (
        <div>
            <Text t="Navigation bar" style="header" />
            <NavigationBar
                navItems={navItems}
                active={active}
                onClick={handleActiveTab}
            />
        </div>
    );
}

const navItems = [
    {
        title: "Home",
        activeImgUrl: "/icons/home-active.svg",
        inactiveImgUrl: "/icons/home-inactive.svg",
    },
    {
        title: "Offerings",
        activeImgUrl: "/icons/offerings-active.svg",
        inactiveImgUrl: "/icons/offerings-inactive.svg",
    },
    {
        title: "Grow",
        activeImgUrl: "/icons/grow-active.svg",
        inactiveImgUrl: "/icons/grow-inactive.svg",
    },
    {
        title: "Reports",
        activeImgUrl: "/icons/reports-active.svg",
        inactiveImgUrl: "/icons/reports-inactive.svg",
    },
    {
        title: "Profile",
        activeImgUrl: "/icons/profile-active.svg",
        inactiveImgUrl: "/icons/profile-inactive.svg",
    },
];
