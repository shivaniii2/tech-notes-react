
import './App.css';
import Public from './components/Public';
import { RouterProvider , createBrowserRouter } from 'react-router-dom';
import Login from './feature/auth/Login';
import DashBoardLayout from './components/DashBoardLayout';
import Welcome from './feature/Welcome';
import NotesList from './feature/notes/NotesList';
import UserList from './feature/users/UserList';
import Layout from './components/Layout';

function App() {
  const appRouter = createBrowserRouter([
    {
      path:'/',
      element : <Layout/>,
      children: [
      {
        index:true,
        element : <Public/>
          
      },
      {
        path:'/login',
        element: <Login/>
      },
      {
        path : 'dash',
        element : <DashBoardLayout/>,
        children:[
          {
          index: true,
          element:<Welcome/>
           },
           {
            path:'notes',
            element: <NotesList/>
           },
           {
            path:'users',
            element: <UserList/>
           },
          
          
          ]
        
      }
    ]
    }
  
  ])
  
  return (
    <>
     
     <RouterProvider  router={appRouter}/>
    </>
   
    
  );
}



export default App;
