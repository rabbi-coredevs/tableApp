import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import './App.css';
import AuthProvider from './components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
 
  return (
    <>
    <AuthProvider>
     <RouterProvider router = {router}></RouterProvider>
    </AuthProvider>
    <ToastContainer/>
    </>
  )
}

export default App;


