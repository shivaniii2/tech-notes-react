
import './App.css';
import Public from './components/Public';
import { RouterProvider , createBrowserRouter } from 'react-router-dom';
import Login from './feature/auth/Login';
import DashBoardLayout from './components/DashBoardLayout';
import Welcome from './feature/auth/Welcome';
import NotesList from './feature/notes/NotesList';
import UserList from './feature/users/UserList';
import Layout from './components/Layout';
import EditUser from './feature/users/EditUser';
import NewUserForm from './feature/users/NewUserForm';
import EditNote from './feature/notes/EditNote';
import NewNote from './feature/notes/NewNote';
import PreFetch from './feature/auth/PreFetch';

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
        element : <PreFetch/>,
        children : [
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
                children : [
                  {
                    index : true,
                    element : <NotesList/>
                  },
                  {
                    path :':id',
                    element: <EditNote/>
                  },
                  {
                    path : 'new',
                    element : <NewNote/>
                  
                  }
                ]
               },
               
               {
                path:'users',
                children :[
                  {
                    index : true,
                    element: <UserList/>
                  },
                  {
                    path : ':id',
                    element: <EditUser/>
                  },
                  {
                    path : 'new',
                    element : <NewUserForm/>
                  }
                  
                ]
               },
              
              
              ]
            
          }
          
        ]      }
      
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
