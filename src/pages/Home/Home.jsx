import React, { useEffect, useRef, useState } from 'react'
import { getNews } from '../../api/external'
import styles from './Home.module.css'
import { Audio,TailSpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles, nextPage, previousPage, resetArticles } from '../../store/articlesSlice/articlesSlice';
import bitcoin from "../../imgs/bitcoin.webp"
import trend from "../../imgs/bull-market-trend-cryptocurrency-bitcoin-600nw-1888907947.webp"
import crypto from "../../imgs/crypto-bitcoin.jpg"
import stock from "../../imgs/istockphoto.webp"
export const imageUrls = [
  bitcoin,
  crypto,
  stock,
  trend
]

const Home = () => {
  // const [articles, setArticles] = useState([])
  // const [isError, setIsError] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const isMounted = useRef(false)
  const { currentPage, isLoading, isError, currentSliceIndex, pages } = useSelector((store) => store.articles);


  // useEffect(()=>{
  //   if(isMounted.current) return
  //   dispatch(getArticles())
  //   isMounted.current = true

  //   return ()=>{
  //     dispatch(resetArticles())
  //     // isMounted.current = false
  //   }
  // },[])


  // useEffect(()=>{
  //   let isMounted = true;
    
  //   (async function newsApiCall(){
  //     try{
  //       const response = await getNews();
  //       console.log(response)
  //       if(isMounted && response?.code !== "ERR_BAD_REQUEST"){
  //         setArticles(response);
  //       }
  //     }catch(error){
  //       console.log(arguments)
  //       setArticles([])
  //     }

  //   })();
    
  //     return ()=>{
  //     isMounted = false;
  //     setArticles([]);
  //   };

  // },[])

  // useEffect(()=>{
  //   if (isMounted.current) return;  
  //   (async function newsApiCall(){
  //     setIsLoading(true)
  //     try{
  //       const response = await getNews();
  //       console.log(response)
  //       if(response.code){
  //         throw Error
  //       }
  //       else{
  //         setArticles(response);
  //         setIsLoading(false)
  //       }
  //     }catch(error){
  //       setArticles([])
  //       setIsLoading(false)
  //       setIsError(true)
  //     }
  //     isMounted.current = true
  //   })();

  //     return ()=>{
  //     isMounted.current = false;
  //     setArticles([]);
  //   };
    
  // },[])
  useEffect(()=>{
    console.log(currentPage)
  })
  const handleOnClick =  (url) =>{
      window.open(url, "_blank")
  }
  
  return (
    <>
    <div className={styles.mainContainer}>
    <div className={styles.heading}> Latest Articles</div>
    { isLoading 
    ? 
    <>
    <p>Loading Home Page</p>
    <span style={{margin:'20px'}}>
    {/* <TailSpin
    height="100"
    width="100"
    radius="1"
    color="green"
    ariaLabel="loading"
    /> */}

  <Audio
    height="80"
    width="80"
    radius="9"
    color="green"
    ariaLabel="loading"
    wrapperStyle
    wrapperClass  
  />  

  </span>
    </>
    :
    isError ?  
       
    <div className={styles.noArtical}>No Articals to Show today</div>
    : 
    <div className={styles.container}>
    {currentPage?.map((article, index)=>{
      const number = Math.random()
      const defaultImage = number < 0.4  ? imageUrls[0] : number < 0.8 ? imageUrls[1] : imageUrls[2] 
      const imageUrl = article?.urlToImage || defaultImage
      return (
        <div 
        className={styles?.card} 
        key={article?.url}
        onClick={()=>handleOnClick(article.url)}  
        >
            <img className={styles?.blogImage} src={imageUrl} alt='' />
            <h3 className={styles?.title}>{article?.title}</h3>
          </div>
        )
      })}
    </div>
      }
      <div className={styles.controls}>
        <button
        disabled = {currentSliceIndex <= 0}
        className={styles.previousBtn}
        onClick={()=>dispatch(previousPage())}
        >
          previous
        </button>
        <button
        disabled = {currentSliceIndex >= pages - 1}
        className={styles.nextBtn}
        onClick={()=>dispatch(nextPage())}
        >
          next
        </button>
      </div>
    </div>
    </>
  )
}

export default Home
