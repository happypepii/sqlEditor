import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { EditorView, lineNumbers } from "@codemirror/view";

import './SqlInput.css'

export function SqlInput(props: any) {
  const [sqlCode, setCodeSql] = useState<string>('SELECT * FROM Customers;');
  const { handleRun } = props;
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault(); // prevent newline
      handleRun(sql);
    }
  };

  const handleChange = (value: string) => {
    setCodeSql(value);
  };

  return(
  <>
    <h1 className="input-title">Online SQL Editor</h1>

    <CodeMirror
      className="mirror-input"
      value={sqlCode}
      height="200px"
      extensions={[sql(), lineNumbers(), EditorView.lineWrapping]}
      onChange={(_, viewUpdate) => handleChange(viewUpdate.state.doc.toString())}
    />

    <div className="btn">
      <button className="input-btn" onClick={() => handleRun(sqlCode)}>Run SQL</button>
    </div>
  </>
  )
}
