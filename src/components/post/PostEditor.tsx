"use client";

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import Editor from "ckeditor5-custom-build/build/ckeditor";

const editorConfiguration = {
  placeholder: "내용을 입력하세요.",
};

const PostEditor = () => {
  const editorDataRef = React.useRef("");
  const [text, setText] = React.useState("");

  const submitHandler = () => {
    console.log(editorDataRef.current);
    setText(editorDataRef.current);
  };

  return (
    <>
      <div>
        <CKEditor
          editor={Editor}
          data={editorDataRef.current}
          config={editorConfiguration}
          onReady={(editor) => {
            // 에디터가 준비되면 이 함수가 호출됩니다.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            editorDataRef.current = data;
          }}
          // 필요한 다른 이벤트 핸들러들...
        />
      </div>
      <button onClick={submitHandler}>제출</button>
      <section dangerouslySetInnerHTML={{ __html: text }}></section>
    </>
  );
};

export default PostEditor;
