"use client"
import Image from "next/image"
import styles from "./page.module.css"
import React from "react"
import { observer } from "mobx-react-lite"
import Users from "./Store/store"

const User = observer(() => {

  const Toggle = () => {
    Users.ToggleUserType();
    //! uncomment and run this one ,to understand actual onSnapshot effect  
    // Users.ToggleUserType1(); 
  }

  const HandleName = () => {
    Users.setUserName("Joy")
  }

  const HandleScore = () => {
    Users.setUserScore(80)
  }

  const HandleUserID = () => {
    //this one for set userid using applySnapshot
    Users.setUserUsingApplySnapshot()
  }

  return (
    <>
      <main className={styles.main}>
      <h1>User Name is : {Users.UserName}</h1>
      <h1>User ID is : {Users.UserId}</h1>
      <h1>User Type is : {Users.UserType}</h1>
      <h1>Total Score is : {Users.TotalScore}</h1>
      <div className="buttons">
      <button className="Toggle" type="button" style={{borderRadius: 5, marginTop:'2rem',width:'100px',height: '30px', border: '1.5px solid red' }} onClick={Toggle}>
        Toggle Type
      </button>
      <button className="Toggle" type="button" style={{borderRadius: 5,marginLeft:'2rem', marginTop:'2rem',width:'100px',height: '30px',border: '1.5px solid' }} onClick={HandleName}>
        Cng Name
      </button>
      <button className="Toggle" type="button" style={{borderRadius: 5,marginLeft:'2rem', marginTop:'2rem',width:'100px',height: '30px',border: '1.5px solid red' }} onClick={HandleScore}>
        Cng Score
      </button> 
      <button className="Toggle" type="button" style={{borderRadius: 5,marginLeft:'2rem', marginTop:'2rem',width:'100px',height: '30px',border: '1.5px solid' }} onClick={HandleUserID}>
        Cng UserID
      </button> 
      </div>
      </main>
    </>
  )
})

export default User