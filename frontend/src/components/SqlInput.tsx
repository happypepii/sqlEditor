import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { EditorView, lineNumbers } from "@codemirror/view";

export function SqlInput(props: any) {
  const [sqlCode, setCodeSql] = useState<string>('SELECT * FROM Customers;');
  const { handleRun } = props;

  const handleChange = (value: string) => {
    setCodeSql(value);
  };

  return(
  <>
    <h1>SQL 練習工具</h1>

    <CodeMirror
      value={sqlCode}
      height="200px"
      extensions={[sql(), lineNumbers(), EditorView.lineWrapping]}
      onChange={(_, viewUpdate) => handleChange(viewUpdate.state.doc.toString())}
    />

    <br />

    <div className="btn-input">
      <button onClick={() => handleRun(sqlCode)}>執行 SQL</button>
    </div>
  </>
  )
}