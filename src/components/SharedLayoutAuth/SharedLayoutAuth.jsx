import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import styles from './SharedLayoutAuth.module.css'

const SharedLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
      <Navbar/>
        <div className={styles.main}>
          <div className={styles.content}>
            <h1 className={styles.heading}> <Link to='/'> BlockChain Bound </Link></h1>
            <p className={styles.into}>
            Explore, Learn and Engage.  <br/>
            Ignite your passion for blockchain. <br/>
            Let's navigate the blockchain revolution together!</p>
          </div>
          <div className={styles.form}>
          <Outlet/>
          </div>
        </div>
          <Footer/>
        </div>
    </div>
  )
}

export default SharedLayout
