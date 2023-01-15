import { memo } from "react";
import ReactPlayer from "react-player";

const QuizVideoPlayer = ({ videoUrl }: { videoUrl: string }): JSX.Element => {
    const Wrapper = ({ children }) => (
        <div className="aspect-video overflow-hidden !z-10">{children}</div>
    );

    return (
        <div className="mt-1 mb-2 rounded-lg aspect-video overflow-hidden !z-10">
            <ReactPlayer
                wrapper={Wrapper}
                url={videoUrl}
                onError={(error) => {
                    console.log(error);
                }}
                controls={true}
                playing={false}
                stopOnUnmount={true}
            />
        </div>
    );
};

export default memo(QuizVideoPlayer, () => {
    return true;
});
