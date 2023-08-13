"use client";

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import Editor from "ckeditor5-custom-build/build/ckeditor";

const PostEditor = () => {
  const editorDataRef = React.useRef("");

  const editorContainerRef = React.useRef<HTMLDivElement | null>(null);

  const adjustEditorHeight = () => {
    if (editorContainerRef.current) {
      const containerHeight = editorContainerRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--ckeditorHeight",
        `${containerHeight - 39}px`,
      );
    }
  };

  return (
    <div ref={editorContainerRef} className="w-[1632px] grow">
      <CKEditor
        editor={Editor}
        data={editorDataRef.current}
        config={{
          placeholder: "내용을 입력해주세요.",
        }}
        onReady={() => {
          adjustEditorHeight();
        }}
        onFocus={() => {
          adjustEditorHeight();
        }}
        onBlur={() => {
          adjustEditorHeight();
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
          editorDataRef.current = data;
        }}
        // 필요한 다른 이벤트 핸들러들...
      />
    </div>
  );
};

export default PostEditor;
