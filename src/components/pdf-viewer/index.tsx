import React, { useEffect } from "react";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import {
    // MoreActionsPopover,
    ToolbarProps,
    ToolbarSlot,
} from "@react-pdf-viewer/toolbar";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { NotFound } from "@components/not-found";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDFViewer = ({
    pdfUrl = "",
    style = "",
}: {
    pdfUrl: string;
    style?: string;
}): JSX.Element => {
    const renderToolbar = (
        Toolbar: (props: ToolbarProps) => React.ReactElement,
    ) => (
        <Toolbar>
            {(toolbarSlot: ToolbarSlot) => {
                const {
                    // CurrentPageInput,
                    // Download,
                    EnterFullScreen,
                    // GoToNextPage,
                    // GoToPreviousPage,
                    // NumberOfPages,
                    // Print,
                    // SwitchTheme,
                    // Zoom,
                    // ZoomIn,
                    // ZoomOut,
                } = toolbarSlot;

                return (
                    <div
                        className="rpv-toolbar"
                        role="toolbar"
                        aria-orientation="horizontal"
                    >
                        {/* <div className="rpv-toolbar__left">
                            <div className="rpv-core__display--hidden rpv-core__display--block-small">
                                <div className="rpv-toolbar__item">
                                    <GoToPreviousPage />
                                </div>
                            </div>
                            <div className="rpv-toolbar__item">
                                <CurrentPageInput />{" "}
                                <span className="rpv-toolbar__label">
                                    / <NumberOfPages />
                                </span>
                            </div>
                            <div className="rpv-core__display--hidden rpv-core__display--block-small">
                                <div className="rpv-toolbar__item">
                                    <GoToNextPage />
                                </div>
                            </div>
                        </div> */}
                        {/* zoom options */}
                        {/* <div className="rpv-toolbar__center">
                            <div className="rpv-toolbar__item">
                                <ZoomOut />
                            </div>
                            <div className="rpv-core__display--block-small">
                                <div className="rpv-toolbar__item">
                                    <Zoom />
                                </div>
                            </div>
                            <div className="rpv-toolbar__item">
                                <ZoomIn />
                            </div>
                        </div> */}

                        <div className="rpv-toolbar__right">
                            {/* <div className="rpv-core__display--hidden rpv-core__display--block-medium">
                                <div className="rpv-toolbar__item">
                                    <SwitchTheme />
                                </div>
                            </div> */}

                            <div className=" rpv-core__display--block-medium">
                                <div className="rpv-toolbar__item">
                                    <EnterFullScreen />
                                </div>
                            </div>

                            {/* <div className="rpv-core__display--block-medium">
                                <div className="rpv-toolbar__item">
                                    <Download />
                                </div>
                            </div>
                            <div className="rpv-core__display--hidden rpv-core__display--block-medium">
                                <div className="rpv-toolbar__item">
                                    <Print />
                                </div>
                            </div>
                            <div className="rpv-toolbar__item">
                                <MoreActionsPopover toolbarSlot={toolbarSlot} />
                            </div> */}
                        </div>
                    </div>
                );
            }}
        </Toolbar>
    );

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        renderToolbar,
        sidebarTabs: () => [],
    });
    const zoomPluginInstance = zoomPlugin();
    const { zoomTo } = zoomPluginInstance;

    useEffect(() => {
        zoomTo(SpecialZoomLevel.PageWidth);
    }, [zoomTo, pdfUrl]);
    if (!pdfUrl.trim()) {
        return (
            <div className={`${style}`}>
                <NotFound></NotFound>
            </div>
        );
    }
    return (
        <div className="w-full">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.js">
                <div className={`min-h-full min-w-full ${style}`}>
                    <Viewer
                        fileUrl={pdfUrl}
                        plugins={[
                            defaultLayoutPluginInstance,
                            zoomPluginInstance,
                        ]}
                    />
                </div>
            </Worker>
        </div>
    );
};

export default PDFViewer;
