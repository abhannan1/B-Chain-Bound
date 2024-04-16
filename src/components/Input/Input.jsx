import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  const {label='', error, errormessage, id,style, labelStyle,wrapperStyle,value, ...rest} = props
  return (
    <div className={styles.inputWrapper} style={wrapperStyle}>
      <label className={styles.inputLabel} htmlFor={id} style={labelStyle}>
        {label}
      </label>
      <input className={`${styles.inputField}`} id={id} value={value} {...rest} style={style}/>
      {error && (
        <p className={styles.errorMsg}>{errormessage}</p>
      ) 
      }
    </div>
  );
};

export default Input;
