import { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import "./CodeEditor.css";

const brackets = {
    '{': '}',
    '(': ')',
    '[':']'
}

export default function CodeEditor() {
  const [content, setContent] = useState("");
  const [start, setStart] = useState(0);
  const [isTab, setIsTab] = useState(false);
  const textAreaRef = useRef();

  const handleKeyDown = (evt) => {
    const {selectionStart} = evt.currentTarget

    let value = content;
    //handle 4-space indent on
    if (evt.key === "Tab") {
      console.log(true);

      evt.preventDefault();
      value = value.substring(0, selectionStart) + `\t` + value.substring(selectionStart);
      setIsTab(true);
    } else {
      if (isTab) setIsTab(false);
    }

    if (brackets[evt.key]) {
        value = value.substring(0, selectionStart) + evt.key + brackets[evt.key] + value.substring(selectionStart)
    }

    setContent(value);
    setStart(selectionStart);
  };

  useEffect(() => {
    Prism.highlightAll();
    if (isTab) {
      textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd =
        start + 1;
    }
  }, [content, isTab]);
  return (
    <div className="code-container">
      <textarea
        ref={textAreaRef}
        className="code-input"
        onKeyDown={handleKeyDown}
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <pre className="language-javascript code-display">
        <code className="language-javascript">{content}</code>
      </pre>
    </div>
  );
}
