import React from 'react';
//import { VideoEditorModal } from "react-native-videoeditorsdk";

export const VideoEditor = ({
    visible,
    onFinish,
    media,
}: {
    visible: boolean;
    onFinish: () => void;
    media: string;
}) => {
    return (
        // Create the video editor modal and handle the export as well as any occuring errors.
        // <VideoEditorModal
        //   // video={require("../../../../../assets/BigBuckBunny.mp4")}
        //   video={media}
        //   visible={visible}
        //   onExport={(result) => {
        //     // The user exported a new video successfully and the newly generated video is located at `result.video`.
        //     console.log(result.video);
        //     // TODO: setEditedMediaUri(result.video);
        //     onFinish();
        //   }}
        //   onCancel={() => {
        //     // The user tapped on the cancel button within the editor.
        //     onFinish();
        //   }}
        //   onError={(error) => {
        //     // There was an error generating the video.
        //     console.log(error);
        //     onFinish();
        //   }}
        // ></VideoEditorModal>
        <></>
    );
};
