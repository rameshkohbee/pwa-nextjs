import { useRecoilValue } from "recoil";
import { KohbeeWebsite, Section } from "src/models/kohbee-website";
import websiteState from "@recoil/atoms/website";

export function useWebsiteSectionData(name: string): {
    hasData: any;
    sectionData: any;
} {
    const kohbeeWebsite: KohbeeWebsite = useRecoilValue(websiteState);
    let hasData = false;
    let sectionData = {} as Section;
    if (
        kohbeeWebsite !== undefined &&
        kohbeeWebsite.sectionWidgetData !== undefined
    ) {
        switch (name) {
            case "MainSection":
                sectionData = kohbeeWebsite.sectionWidgetData.mainSection;
                break;
            case "AboutUsSection":
                sectionData = kohbeeWebsite.sectionWidgetData.aboutUsSection;
                break;
            case "CounterSection":
                sectionData = kohbeeWebsite.sectionWidgetData.counterSection;
                break;
            case "CourseSection":
                sectionData = kohbeeWebsite.sectionWidgetData.courseSection;
                break;
            case "FeatureSection":
                sectionData = kohbeeWebsite.sectionWidgetData.featureSection;
                break;
            case "FaqSection":
                sectionData = kohbeeWebsite.sectionWidgetData.faqSection;
                break;
            case "TestimonialSection":
                sectionData =
                    kohbeeWebsite.sectionWidgetData.testimonialSection;
                break;
            case "ImageSection":
                sectionData = kohbeeWebsite.sectionWidgetData.imageSection;
                break;
            case "VideoSection":
                sectionData = kohbeeWebsite.sectionWidgetData.videoSection;
                break;
            case "LinkSection":
                sectionData = kohbeeWebsite.sectionWidgetData.linkSection;
                break;
            default:
                break;
        }
        if (sectionData !== undefined && sectionData.sectionType !== null) {
            hasData = true;
        }
    }
    return { hasData: hasData, sectionData: sectionData };
}
