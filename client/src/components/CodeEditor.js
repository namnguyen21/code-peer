import { useState, useEffect, useRef } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { CodemirrorBinding } from "y-codemirror";
//import io from "socket.io-client";
import "./CodeEditor.css";

const ENDPOINT = "ws://localhost:3001";

export default function CodeEditor() {
  const [editorValue, setEditorValue] = useState("");
  const socketRef = useRef();
  const editorRef = useRef();

  // useEffect(() => {
  //   socketRef.current = new WebSocket(ENDPOINT);
  //   socketRef.current.addEventListener("open", () => {
  //     console.log("connection opened");
  //   });
  // }, []);

  useEffect(() => {
    console.log(editorRef.current);
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(ENDPOINT, "", ydoc);
    const yText = ydoc.getText("codemirror");
    console.log(yText);
    const binding = new CodemirrorBinding(
      yText,
      editorRef.current,
      provider.awareness
    );
    // return () => {
    //   binding.destroy();
    //   provider.destroy();
    // };
  }, []);

  function handleChange(editor, data, value) {
    setEditorValue(value);
  }

  return (
    <div className="code-container">
      <CodeMirror
        editorDidMount={(editor) => (editorRef.current = editor)}
        value={editorValue}
        onBeforeChange={(editor, data, value) =>
          handleChange(editor, data, value)
        }
        //onChange={(editor, data, value) => handleChange(editor, data, value)}
        options={{
          mode: "javascript",
          lineNumbers: true,
          autoCloseBrackets: true,
          matchBrackets: true,
        }}
      />
    </div>
  );
}
