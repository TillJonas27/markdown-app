import React from 'react'
import './App.css'

function Editor(props) {
  return (
  <div id="editorComponent" className="bg-light-subtle shadow-sm card p-0 col-12 col-lg-5">
      <div className="card-header">
        <div className="row align-items-center">
          <p className="col m-0">Editor</p> 
          <i onClick={() => props.fullScreen("previewerComponent")} className={props.displayPreviewer ? "col-1 fa-solid fa-maximize" : "col-1 fa-solid fa-minimize"}></i>
        </div>
      </div>
    <div className="card-body p-0 w-full">
      <textarea rows="15" value={props.textValue} onChange={props.updatePreviewer} id="editor" className="w-full"></textarea>
    </div>
  </div>
  )
}

function Previewer(props) {
  React.useEffect( () => {
    document.getElementById("preview").innerHTML = marked.parse(props.textValue)
  }, [props.textValue]) 

  return (
    <div id="previewerComponent" className="bg-light-subtle shadow-sm card p-0 col-12 mt-2 mt-lg-0 col-lg-5">
      <div className="card-header">
        <div className="row align-items-center">
          <p className="col m-0">Previewer</p> 
          <i onClick={() => props.fullScreen("editorComponent")} className={props.displayEditor ? "col-1 fa-solid fa-maximize" : "col-1 fa-solid fa-minimize"}></i>
          {/* <i class="fa-solid fa-minimize"></i> */}
        </div>
      </div>
      <div className="card-body" style={{height: "30vh"}}>
        <div id="preview">
        </div>
      </div>
  </div>
  )
}


function App() {
  const [editorContent, setEditorContent] = React.useState(`
  # Header
  ## Subheader
  My favorite Website is [meyerjark.de](https://meyerjark.de)

      <html>
        <head>
          <title>Test</title>
        </head>
      </html>

  > Dorothy followed her through many of the beautiful rooms in her castle.

  __This is bold text__

  **This as well**

  *And this is italics*
  `)
  const [displayPreviewer, setDisplayPreviewer] = React.useState(true)
  const [displayEditor, setDisplayEditor] = React.useState(true)

  function updatePreviewer(e) {
    setEditorContent(e.target.value)
  }

  return (
    <div className="container h-50">
      <a href="https://webfabrik.substack.com/p/markdown-app?sd=pf" target="_blank"><i className="fa-solid fa-info"></i></a>
      <a target="_blank" href="https://github.com/TillJonas27/" ><i className="fa-brands fa-github"></i></a>
      <h1 className="mb-4 border-bottom">markdown application</h1>
      <div className="row h-100 justify-content-around">
        {displayEditor ? <Editor 
                          fullScreen={() => setDisplayPreviewer(old => !old)} 
                          textValue={editorContent} 
                          updatePreviewer={updatePreviewer} 
                          displayPreviewer={displayPreviewer}
                          /> : ""
                          }
        {displayPreviewer ? <Previewer 
                            fullScreen={() => setDisplayEditor(old => !old)} 
                            textValue={editorContent}
                            displayEditor={displayEditor}
                            /> : ""}
      </div>
    </div>
  )
}

export default App
