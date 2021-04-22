import { useState, useEffect, useRef } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { CodemirrorBinding } from "y-codemirror";
//import io from "socket.io-client";
import "./CodeEditor.css";

const ENDPOINT = "ws://localhost:3001";

export default function CodeEditor() {
  const [editorValue, setEditorValue] = useState("");
  const socketRef = useRef();
  const editorRef = useRef();

  useEffect(() => {
    socketRef.current = new WebSocket(ENDPOINT);
    socketRef.current.addEventListener("open", () => {});
  }, []);

  useEffect(() => {
    console.log(editorRef.current);
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider("peer-code-123", ydoc, {
      signaling: ["wss://y-webrtc-signaling-us.herokuapp.com"],
    });
    provider.awareness.setLocalStateField("user", {
      name: "nam",
    });
    const yText = ydoc.getText("codemirror");
    const binding = new CodemirrorBinding(
      yText,
      editorRef.current,
      provider.awareness
    );
    // const provider = new WebsocketProvider(ENDPOINT, "", ydoc);
    // provider.awareness.setLocalStateField("user", {
    //   name: "Nam",
    //   color: "",
    // });
    // const yText = ydoc.getText("codemirror");
    // console.log(yText);
    // const binding = new CodemirrorBinding(
    //   yText,
    //   editorRef.current,
    //   provider.awareness
    // );
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
