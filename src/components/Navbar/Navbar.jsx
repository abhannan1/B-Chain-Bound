import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../api/internal";
import { setUser } from "../../store/userSlice/userSlice";
import { ChevronDown, ChevronUp } from "./buttons";

const Navbar = () => {
  const isAuthenticated = useSelector((state)=>state.user.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isNav, setIsNav] = useState(true)
  const [isDesktop, setIsDesktop] = useState(false)
  const isMounted = useRef(false)

  const handleNav = () =>{
    setIsNav(!isNav)
  }

  // useEffect(()=>{
  //   console.log(`Navbar ${isNav}`)
  // })


  useEffect(()=>{

  const handleResize = ()=>{
        window.innerWidth > 768 ? setIsDesktop(true) : setIsDesktop(false)
        // console.log(`desktop: ${isDesktop}`)
  }

   window.addEventListener('resize', handleResize)

  return ()=>{
    window.removeEventListener('resize', handleResize);
  }
}, [isDesktop])


// useEffect(() => {
//   window.innerWidth > 768 ?
//       setIsDesktop(true) : setIsDesktop(false);
// }, []);

// window.addEventListener('resize', () => {
//   window.innerWidth > 600 ?
//       setIsDesktop(true) : setIsDesktop(false);
// });


  const handleLogout = async() => {
    const response = await logout()
    const user = {
      auth:response?.response?.data?.auth || false
    }
    dispatch(setUser(user))
    navigate("/");
  };

  const navStyles = {
    opacity: 1,
    // width: '1rem',
    height: 'auto',
    // visibility: 'visible',
    // transition: 'opacity 0.3s ease, height 0.3s ease, visibility 0s 0s', 
    // transform:'translateY(0, 0)',
    transition: '0.3s'
  }

  const navStyles1 = {
    opacity: 0,
    height: 0,
    // visibility: 'hidden',
    // transition: 'opacity 0.3s ease, height 0.3s ease, visibility 0s 0.3s',
    transform:'translateX(-100%)',
    // transition:'0.3s',
    transition:'0.2s'
  }

  const newSt = {
    display: 'grid',
    gridTemplateColumns: 'auto'
  }


  return (
    <>
    <span
    style={isDesktop ? {} : isNav ? navStyles : navStyles1}
    className={styles.navSpan}
    >
      <nav 
      className={styles.navbar}
      >
        <NavLink exact='true' to="/" className={`${styles.logo} `}>
          BlockChain Bound
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? ` ${styles.active} ${styles.link}` : styles.link
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/crypto"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          CryptoCurrencies
        </NavLink>

        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Blogs
        </NavLink>
        <NavLink
          to="/submit"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Submit a blog
        </NavLink>

        {isAuthenticated ? (
          <>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <button
                className={`${styles.logoutButton}`}
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <button
                className={styles.loginButton}
              >
                Login
              </button>
            </NavLink>

            <NavLink
              to="/signUp"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <button className={`${styles.signUpButton}`}>Signup</button>
            </NavLink>
          </>
        )}

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          //   style={({ isActive }) => {
          //     return { color: isActive ? 'red' : 'grey' };
          // }}
        >
          About
        </NavLink>
      </nav>
      <div className={styles.separator}></div>
    </span>
      <button 
      className={styles.shiftButton} onClick={handleNav}>
        {isNav ? <ChevronUp/> : <ChevronDown/>}
      </button>
      </>
  );
};

export default Navbar;
