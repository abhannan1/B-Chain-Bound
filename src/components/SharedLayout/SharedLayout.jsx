import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import styles from './sharedLayout.module.css'

const SharedLayout = () => {

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Navbar/>
        <div className={styles.main}>
        <Outlet/>
        </div >
        <Footer/>
      </div>
    </div>
  )
}

export default SharedLayout
