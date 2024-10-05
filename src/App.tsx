import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Main from './components/Main';
import Details from './components/Details';
import Login from './components/Login';
import Addproduct from './components/Addproduct';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const AuthWrapper = ( {children}:any ) => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // if (user) {
      //   navigate("/");
      //   // navigate("/Addproduct");

      // } else {
      //   navigate("/login");
      // }
      if(!user){
        navigate('/login')
      }
    });

    return () => unsubscribe();
  }, []);

  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/details' element={<Details />} />
          <Route path='/Addproduct' element={<Addproduct />} />
        </Routes>
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;