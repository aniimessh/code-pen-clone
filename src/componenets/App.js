import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import LocalStroage from "../hooks/LocalStroage";
function App() {
  const [html, setHtml] = LocalStroage('html',"")
  const [css, setCss] = LocalStroage('css',"")
  const [js, setJs] = LocalStroage('js',"");
  const [srcDoc, setsrcDoc] = LocalStroage('')

  useEffect(() =>{
    const timeout = setTimeout(()=>{
      setsrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `)
    },250)
    return () => clearTimeout(timeout)
  }, [html,css,js])
  return (
    <>
      <div className="pane top-pane">
      <Editor
        language="xml"
        displayName="HTML"
        value={html}
        onChange={setHtml}
      />
      <Editor 
        language="css"
        displayName="CSS"
        value={css}
        onChange={setCss}
      />
      <Editor 
        language="js"
        displayName="JavaScript"
        value={js}
        onChange={setJs}
      />
      </div>
      <div className="pane">
        <iframe
          srcDoc ={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
