import { useState, useEffect, useRef } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/selection/active-line";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { CodemirrorBinding } from "y-codemirror";
import styled from "styled-components";

// THEMES
import "codemirror/theme/ayu-dark.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/material-darker.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/theme/nord.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/base16-light.css";

// LANGUAGES
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/htmlmixed/htmlmixed";

import Select from "../../util/Select";
import Button from "../../util/Button";

import "./CodeEditor.css";

const Container = styled.section`
  height: 100%;
  max-height: 100%;
  width: ${(props) => (props.chatOpen ? "100%" : "100vw")};
  transition: all 0.2s;
`;

const EditorContainer = styled.div`
  width: 100%;
  height: ${(props) => `calc(100vh - ${props.topBarHeight}px)`};
`;

const Settings = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.lightGrey};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
`;

const Label = styled.label`
  font-size: 1rem;
`;

const ENDPOINT = "localhost:3001";

export default function CodeEditor({
  roomId,
  name,
  topBarHeight,
  chatOpen,
  setBackgroundIsLight,
  socket,
  color,
  settingsRef,
  setInviteModalOpen,
  initialTheme,
  initialLanguage,
}) {
  const [editorValue, setEditorValue] = useState("");
  const modesRef = useRef([
    { display: "JavaScript", value: "javascript" },
    { display: "Python", value: "python" },
    { display: "Java", value: "java" },
    { display: "HTML", value: "html-mixed" },
  ]);
  const themesRef = useRef([
    { display: "Ayu Dark", value: "ayu-dark", type: "dark" },
    { display: "Darcula", value: "darcula", type: "dark" },
    { display: "Monokai", value: "monokai", type: "dark" },
    { display: "Material Darker", value: "material-darker", type: "dark" },
    { display: "Material Ocean", value: "material-ocean", type: "dark" },
    {
      display: "Material Palenight",
      value: "material-palenight",
      type: "dark",
    },
    { display: "Nord", value: "nord", type: "dark" },
    { display: "Elegant", value: "elegant", type: "light" },
    { display: "Base16 Light", value: "base16-light", type: "light" },
  ]);

  const editorRef = useRef();
  const [theme, setTheme] = useState(
    themesRef.current.find((t) => t.display === initialTheme)
  );
  const [mode, setMode] = useState(
    modesRef.current.find((m) => m.display === initialLanguage)
  );

  console.log(mode);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(`peer-code-${roomId}`, ydoc, {
      signaling: ["wss://y-webrtc-signaling-us.herokuapp.com"],
    });
    console.log(color);
    provider.awareness.setLocalStateField("user", {
      name,
      color,
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

  useEffect(() => {
    if (!socket) return;
    socket.on("theme-change", (newTheme) => {
      const themeObj = themesRef.current.find((t) => t.value === newTheme);
      setTheme(themeObj);
    });

    socket.on("mode-change", (mode) => {
      const modeObj = modesRef.current.find((m) => m.value === mode);
      setMode(modeObj);
    });
  }, [socket]);

  useEffect(() => {
    if (theme.type === "light") {
      setBackgroundIsLight(true);
    } else {
      setBackgroundIsLight(false);
    }
  }, [theme]);

  function handleChange(editor, data, value) {
    setEditorValue(value);
  }

  function handleThemeChange(theme) {
    setTheme(theme);
    socket.emit("theme-change", { roomId, theme: theme.value });
  }

  function handleModeChange(lang) {
    setMode(lang);
    socket.emit("mode-change", { roomId, mode: lang.value });
  }

  const onInvite = () => {
    setInviteModalOpen(true);
  };

  return (
    <Container chatOpen={chatOpen} className="code-container">
      <Settings ref={settingsRef}>
        <div>
          <Label>Theme: </Label>
          <Select
            value={theme.value}
            setValue={handleThemeChange}
            options={themesRef.current}
          />
        </div>
        <div>
          <Label>Language: </Label>
          <Select
            value={mode.value}
            setValue={handleModeChange}
            options={modesRef.current}
          />
        </div>
        <div>
          <Button onClick={onInvite}>Invite Peers</Button>
        </div>
      </Settings>
      <EditorContainer topBarHeight={topBarHeight}>
        <CodeMirror
          ref={() => editorRef}
          style={{ width: "100%", minHeight: "100%" }}
          editorDidMount={(editor) => (editorRef.current = editor)}
          value={editorValue}
          onBeforeChange={(editor, data, value) =>
            handleChange(editor, data, value)
          }
          options={{
            mode: mode.value,
            lineNumbers: true,
            theme: theme.value,
            autoCloseBrackets: true,
            matchBrackets: true,
            styleActiveLine: true,
            styleActiveSelected: true,
            indentUnit: 4,
          }}
        />
      </EditorContainer>
    </Container>
  );
}
