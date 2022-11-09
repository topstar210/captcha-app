import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import DefaultLayout from './layout/DefaultLayout';

// import Storage from './utils/Storage';
// import { useEffect, useState } from "react";

// import { useDispatch, useSelector } from 'react-redux';
// import myaxios from './provider/API'
// import { setUserInfo } from "./store/actions/app.actions";

function App() {
  // const dispatch = useDispatch();

  // const [ siteToken, setSiteToken ] = useState(useSelector(state => state.sapp));

  // useEffect(()=>{
  //   myaxios.auth.checkToken("Bearer "+Storage.get('c_token')).then((res)=>{
  //     dispatch(setUserInfo(res.data));
  //     setSiteToken(res.data.token);
  //   })
  // })


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;