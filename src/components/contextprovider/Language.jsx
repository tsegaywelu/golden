import React from 'react'
import { createContext,useState } from 'react'
export const LanguageContext=createContext()
const Language = ({children}) => {
  const [contextData, setcontextData] = useState({Language:"English",mode:'Light'});
  
  

  return (
    <LanguageContext.Provider value={{contextData, setcontextData}}>
      {children}
    </LanguageContext.Provider>
  )
}

export default Language