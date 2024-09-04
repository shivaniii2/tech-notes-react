import { useNavigate , useLocation} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"


const DashFooter = () => {
    
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const onGoHomeClicked = () =>{
        navigate('/dash')
    }
    let goToHome = null
    if(pathname !== '/dash'){
        goToHome = (
            <button
                 className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}>
               <FontAwesomeIcon icon={faHouse} />
            </button>
            
        )
    }
  return (
    <footer className="dash-footer">
        {goToHome}
        <p>Current User:</p>
        <p>Status:</p>
        
    </footer>
  )
}

export default DashFooter