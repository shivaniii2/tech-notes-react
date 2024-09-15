import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";


const Login = () => {
  
  const userRef = useRef();
  const errRef = useRef();
  const[username , setUsername ] = useState('')
  const[password , setPassword] = useState('')
  const[errmsg , setErrmsg] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [login , {isLoading}] = useLoginMutation()
  
  const errClass = errmsg ? 'errmsg' : 'offscreen'
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
     const {accessToken} =  await login({username , password}).unwrap()
     // In the Login component, you used .unwrap() to directly access the accessToken from the resolved promise and then store it in Redux using setCredentials(). In the EditNoteForm, you're simply adding a new note, and there is no need to access the raw response data. Once the mutation completes successfully, you don’t need to interact with the returned data, so .unwrap() isn’t necessary.
     
     dispatch(setCredentials({accessToken}));
     setUsername('');
     setPassword('')
     navigate('/dash')
     
     
     // nourish
     //hii@123
    }catch(error){
      //navigate('/dash/users')
      if(!error.status){
        setErrmsg('No Server response found')
      } else if(error.status === 400){
        setErrmsg('Missing Username or Password');
      } else if (error.status === 401) {
        setErrmsg('Unauthorized');
      } else {
      setErrmsg(error.data?.message);
      }
      //errRef.current.focus();
    }
 
    
  }
  
  useEffect(() => {
    userRef.current.focus()
  }, [])
  
  
  useEffect(() => {
    setErrmsg('')
  },[username , password])
  
  const handleUserInput = ( e) => setUsername(e.target.value);
  
  const handlePwdInput = (e) => setPassword(e.target.value)
  if (isLoading) return <p>Loading...</p>
  
  const content = (
    <>
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      
      <main className="login">
        
        <p ref={errRef} className={errClass} aria-live="assertive">{errmsg}</p>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username :</label>
          <input className="form__input"  type="text" id="username" ref={userRef} value={username} onChange={handleUserInput} autoComplete="off" required>
          </input>
          
          
          
          <label htmlFor="password">Password:</label>
          <input className="form__input" type="password" id="password" onChange={handlePwdInput} value={password} required/>
          
          <button className="form__submit-button">Sign In</button>
          
          
         </form>
        
        
        
        
      </main>
      <footer>
        
      <Link to="/">Back to Home</Link>
      </footer>
      
    </section>
    
    
    
    
    
    </>
  )
  
  return content

}

export default Login