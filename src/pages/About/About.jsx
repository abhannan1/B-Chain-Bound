import React from 'react'
import styles from './About.module.css'
import img from "../../imgs/crypto-bitcoin.jpg"


const About = () => {
  // const imgUrl = "https://scontent.fkhi5-1.fna.fbcdn.net/v/t1.6435-9/39196747_1920801771310948_8567984212446019584_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEjK1cro-JEirEAqqFWwjPqsxTUwZIb8y2zFNTBkhvzLTkCrnRXJfuftgtVcFz9WtDDGbvTcIhOiaxNd34MlQXR&_nc_ohc=4U6msdDaV3kAX_58JAs&_nc_ht=scontent.fkhi5-1.fna&oh=00_AfCkIxZlrCLi-25zz2Ffx2et33bNBmHgwI5QO4sqk3k67w&oe=661511EA" 

  return (
    <div className={styles.aboutWrapper}>
      <div className={styles.body}>
        <div className={styles.left}>
          <img src={img} alt="" />
        </div>
        <div className={styles.right}>
          <div className={styles.aboutUs}>About Us</div>
          <div className={styles.aboutUsDetails}>Stay informed on the latest business and blockchain trends with our app! Access curated blogs covering diverse topics. Take an active role by creating and sharing your own blogs, contributing to a dynamic community of industry enthusiasts.</div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.contactHeading}>Contact Details</div>
        <div className={styles.Phone} >Phone # : 03082201485</div>
        <div className={styles.email}>Email # : ab.hannan142@gmail.com</div>
      </div>
    </div>
  )
}

export default About
