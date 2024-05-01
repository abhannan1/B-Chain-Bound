import React, { useEffect, useRef, useState } from 'react'
import { getCrypto } from '../../api/external'
import styles from './Crypto.module.css'
import { TailSpin } from 'react-loader-spinner';


export const Crypto =() => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const isMounted = useRef(false)


    useEffect(()=>{
        
        (async function cryptoApiCall (){
            if(isMounted.current) return;
            setIsLoading(true)
            try {
                const response = await getCrypto()
                if (response.code){
                    setIsLoading(false)
                    throw Error
                }
                else{
                    setData(response.data.slice(0,15))
                    setIsLoading(false)
                }
                } catch (error) {
                    console.log(error)
                    setIsLoading(false)
            }   
        })()
        isMounted.current = true

        return () => {
            isMounted.current = false
            setData([])
        }
    },[])

    const postiveStyle = {
        color: 'green'
    }

    const negativeStyle = {
        color: 'red'
    }

    if(isLoading){
        return(
            <TailSpin
                height="100"
                width="100"
                radius="1"
                color="green"
                ariaLabel="loading"
            />
        )
    }

    return (
        <>
        <div className={styles.container} >
        <p className={styles.heading}>CryptoCurrencies</p>
        <div className={styles.tableWrapper} >
            <table className={styles.table} >

                <thead>
                    <tr className={styles.tableHead}>
                        <th>#</th>
                        <th>Coin</th>
                        <th>Symbol</th>
                        <th>Price $</th>
                        <th>24h</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((coin, index)=>{

                        return(
                            <tr key={coin.id} className={styles.tableRow}>
                                <td>{coin.market_cap_rank}</td>
                                <td>
                                    <div className={styles.logo}>
                                        <img src={coin.image} alt="" /> {coin.name}
                                    </div>
                                </td>
                                <td >
                                    <div className={styles.symbol}>{coin.symbol}</div>
                                </td>
                                <td>{coin.current_price}</td>
                                <td style={coin.price_change_percentage_24h > 0 ? postiveStyle : negativeStyle}>{coin.price_change_percentage_24h}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </div>

    </>
  )
}
