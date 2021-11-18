import React, { useEffect, useState } from 'react'
import { Navbar, Footer, Routes } from './components/componentsExporter'
const App = () => {
  const storedDarkMode = localStorage.getItem("DARK_MODE")
  const [darkTheme, setDarkTheme] = useState(storedDarkMode)
  useEffect(()=>{
    localStorage.setItem("DARK_MODE", darkTheme)
  },[darkTheme])
  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen ">
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <Routes />
      <Footer />
      </div>
    </div>
  )
}

export default App
