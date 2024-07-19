import React, { useRef, useState } from 'react'
import {USER_DATA} from '../api'

const LoginPage = () => {
    let [isLogin, setisLogin] =useState(false)
   let logintext= useRef(null)
  let  password =useRef(null)

function handleSubmit(event){
    
  let result=  USER_DATA.find(x=> x.name == logintext.current.value && x.password ==password.current.value )
  console.log(result)

}

  return (
    <>
        <div>

            <input type="text" ref={logintext}></input>
            <input type="password" ref={password}></input>

            <button type="submit" onClick={handleSubmit}>Login</button>
        </div>

        <div>
            {/* <Weather />
            <ScribblePad/>
        <StockGraphMain/>  */}
        </div>

    </>
  )
}

export default LoginPage