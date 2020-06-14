import React from 'react'
import Main from "./components/Main"
import Modal from "react-modal"

import './App.css'



Modal.setAppElement('#root')

function App() {

  return (
      <div>
        <Main />
      </div>
  )
}

export default App;
