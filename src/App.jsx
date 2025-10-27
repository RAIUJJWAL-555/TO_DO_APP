import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Inbox from './assets/componant/inbox'
import Home from './assets/componant/home'
import AddTask from './assets/componant/addTask'
import Quote from './assets/componant/Quote'
import Joke from './assets/componant/joke'
import Completed from './assets/componant/completed'








const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    children: [
    
      {
        index:true,
        element:<h2>Welcome to TO-DO App</h2>
      },
      {
        path:'/inbox',
        element:<Inbox/>
      },
      {
        path:'/completed',
        element:<Completed />

      },
      {
        path:'/Quote',
        element:<Quote/>
      },
      {
        path:'/joke',
        element:<Joke/>
      },
      {
        path:'/addTask',
        element:<AddTask/>
      }
    ]
  },
  
])



function App() {

  
  return (
    <>
    
      <RouterProvider router={router}/>
      
        </>
    
  );
}




export default App;