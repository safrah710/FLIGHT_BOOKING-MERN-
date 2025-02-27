import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import routes from './Utils/Router';
function App() {
  let router=createBrowserRouter(routes);
  return<>
  <RouterProvider router={router}/>
  <Toaster/>
  </>
}

export default App
