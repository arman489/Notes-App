import React, { useEffect, useState } from 'react'
import Login from './page/Login'
import Register from './page/Register'
import Header from './component/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Protect from './ProtectRouter/Protect'
import FormFill from './component/FormFill'
import Singlepage from './page/Singlepage'
import EditNote from './component/EditNote'
import Intro from './component/Intro'


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Intro />;
  }
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<h1>Coming soon....</h1>} />
        <Route element={<Protect />}>
          <Route path="/" element={<Home />} />
          <Route path="/createform" element={<FormFill />} />
          <Route path="/single/:id" element={<Singlepage />} />
          <Route path="/edit/:id" element={<EditNote />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App