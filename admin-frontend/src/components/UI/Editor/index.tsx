"use client";
import React from 'react';
import dynamic from "next/dynamic";
// import 'suneditor/dist/css/suneditor.min.css';
import Editors from 'react-simple-wysiwyg';

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

const Editor = ({ placeholder, value, onChange, setOptions}: any) => {
    console.log(value);

    return (
        <div>
                <Editors value={value} onChange={onChange} />

            {/* <SunEditor
                placeholder={placeholder}
                setContents={value}
                onChange={onChange}
                setOptions={setOptions}
            /> */}
        </div>
    );
};

export default Editor;


// import React, { Component } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw } from "draft-js";

// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draftjs-to-html";

// export default class Editor extends Component {
//     state = {
//         editorState: EditorState.createEmpty(),
//     };

//     onEditorStateChange = (editorState: any) => {
//         this.setState({
//             editorState,
//         });
//     };

//     render() {
//         const { editorState } = this.state;
//         console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
//         return (
//             <div>
//                 <Editor
//                     editorState={editorState}
//                     toolbarClassName="toolbarClassName"
//                     wrapperClassName="wrapperClassName"
//                     editorClassName="editorClassName"
//                     onEditorStateChange={this.onEditorStateChange}
//                 />
//                 <textarea
//                     disabled
//                     value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//                 ></textarea>
//             </div>
//         );
//     }
// }
