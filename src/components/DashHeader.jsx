import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSendLogoutMutation } from "../feature/auth/authApiSlice"
import { useEffect } from "react"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/
const DashHeader = () => {
  
  const {pathname} = useLocation()
  // useLocation(): This hook returns the current location object, which contains information about the current URL. This object includes properties like pathname, search, and hash.pathname: This is the part of the URL that comes after the domain, excluding any query parameters (?) or hash (#). For example, if the current URL is https://example.com/dash/notes, pathname would be /dash/notes.
  const navigate = useNavigate()
  const [sendLogout , {
    isLoading ,
    isSucccess,
    isError ,
    error
  }] = useSendLogoutMutation()
  
  
  useEffect(() => {
   if(isSucccess){
    navigate('/')
   } 
  } ,[navigate , isSucccess])
  
  
  const logoutButton = (
    <button className="icon-button"
    title="Logout"
    onClick={sendLogout}>
      
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  )
  if(isLoading) return <p>  Logging out...  </p>
  if(isError) return <p>Error : {error?.data?.message}</p>
  let dashClass = null
  if(!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)){
    dashClass = "dash-header__container--small"
  }
    
    
    
  const content =  (
    <>
    <header className="dash-header">
     <div className={`dash-header__container ${dashClass}`}>
        <Link to="/dash">
            <h1 className="dash-header__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav">
            {/* add nav buttons later */}
            {logoutButton}
        </nav>
    </div>
    </header>
    </>
  )
  return content
}

export default DashHeader