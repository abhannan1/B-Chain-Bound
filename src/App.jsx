import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import ProtectedRoutes from "./components/Protected/ProtectedRoutes";
import Error from "./pages/Error/Error";
import Login from "./pages/Login/Login";
import SharedLayoutAuth from "./components/SharedLayoutAuth/SharedLayoutAuth";
import Register from "./pages/register/Register";
import { useDispatch, useSelector } from "react-redux";
import { Crypto } from "./pages/Crypto/Crypto";
import { Blogs } from "./pages/Blogs/Blogs";
import { EditSubmitBlog } from "./pages/EditSubmitBlog/EditSubmitBlog";
import { BlogDetail } from "./pages/BlogDetail/BlogDetail";
import { useAutoLogin } from "./hooks/useAutoLogin";
import { TailSpin } from "react-loader-spinner";
import { PublicRoute } from "./components/PublicRoutes/PublicRoute";
import { useEffect, useRef } from "react";
import { getArticles, resetArticles } from "./store/articlesSlice/articlesSlice";

function App() {
  const isLoading = useAutoLogin();
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  // navigate('/login', {replace:true, state:{from:location}})
  // const location = useLocation()

  const isMounted = useRef(false)


  useEffect(()=>{
    if(isMounted.current) return
    dispatch(getArticles("Shamon"))
    isMounted.current = true

    return ()=>{
      dispatch(resetArticles())
      // isMounted.current = false
    }
  },[])


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={
            <SharedLayoutAuth />        
        }>
          <Route path="login" element={
            <PublicRoute>          
              <Login />
            </PublicRoute>
          } />
          <Route path="signUp" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
          } />
          
        </Route>

        <Route exact path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          <Route
            path="blogs"
            element={
              <ProtectedRoutes>
                <Blogs />
              </ProtectedRoutes>
            }
          />

          <Route
            path="blog/:id"
            element={
              <ProtectedRoutes>
                <BlogDetail />
              </ProtectedRoutes>
            }
          />

          <Route path="crypto" element={<Crypto />} />

          <Route
            path="submit"
            element={
              <ProtectedRoutes>
                <EditSubmitBlog />
              </ProtectedRoutes>
            }
          />

          {/* <Route path="sign-up" element={<Blogs />} /> */}

          <Route path="*" element={<Error />} />
        </Route>
      </Route>
    )
  );

  return (
    isLoading ? (
      <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", height:"100vh"}}>
    <TailSpin
      height="100"
      width="100"
      radius="1"
      color="green"
      ariaLabel="loading"
      />
      </div>
  ) :
   (
    <RouterProvider router={router} />
  )
  );
}

export default App;
