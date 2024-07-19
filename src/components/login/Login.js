import React, { useRef, useState } from 'react'

const Login = () => {
    let [isLogin, setisLogin] =useState(false)
   let logintext= useRef(logintext)
  let  password =useRef(password)

function handleSubmit(event){
    console.log(logintext.current,password.current)


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

export default Login