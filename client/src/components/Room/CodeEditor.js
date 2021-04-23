import { useState, useEffect, useRef } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { CodemirrorBinding } from "y-codemirror";
import "./CodeEditor.css";

const ENDPOINT = "localhost:3001";

export default function CodeEditor({ roomId, name }) {
  const [editorValue, setEditorValue] = useState("");
  const editorRef = useRef();

  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(`peer-code-${roomId}`, ydoc, {
      signaling: ["wss://y-webrtc-signaling-us.herokuapp.com"],
    });
    provider.awareness.setLocalStateField("user", {
      name,
    });
    const yText = ydoc.getText("codemirror");
    const binding = new CodemirrorBinding(
      yText,
      editorRef.current,
      provider.awareness
    );
    return () => {
      binding.destroy();
      provider.destroy();
    };
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
