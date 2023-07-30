import React from 'react';
//import { PhotoEditorModal } from "react-native-photoeditorsdk";

interface PhotoEditorProps {
    visible: boolean;
    onFinish: () => void;
    media: string;
}

export const PhotoEditor = (props: PhotoEditorProps) => {
    return (
        // <PhotoEditorModal
        //     image={props.media}
        //     visible={props.visible}
        //     onExport={(result) => {
        //         console.log(result.image);
        //         props.onFinish();
        //     }}
        //     onCancel={() => {
        //         props.onFinish();
        //     }}
        //     onError={(error) => {
        //         console.log(error);
        //         props.onFinish();
        //     }}
        // ></PhotoEditorModal>
        <></>
    );
};
