/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import { useRecoilState } from "recoil";
import FloatingWhatsApp from "react-floating-whatsapp";
import websiteState from "@recoil/atoms/website";

export default function WhatsappContact(): JSX.Element {
    const [websiteData] = useRecoilState(websiteState);

    return (
        <>
            <div />
            {websiteData.settings?.hasWhatsappFab ? (
                <FloatingWhatsApp
                    phoneNumber={websiteData.settings?.whatsappNumber}
                    accountName={websiteData.title!}
                    avatar={
                        websiteData.sectionWidgetData!.aboutUsSection.imageUrl!
                    }
                    allowClickAway
                    notification={false}
                    className="z-50"
                />
            ) : (
                <div />
            )}
        </>
    );
}
