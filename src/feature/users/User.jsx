import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from 'react-redux'
import { selectUserById } from './userApiSlice'
import { useNavigate } from 'react-router-dom'


const User = ({userId}) => {
    const user = useSelector(state => selectUserById(state , userId) )
    //  selectUserById - prebuilt selector given by createEntityAdapter - A selector function that fetches a specific user by ID from the Redux state.When you call getSelectors() on an entity adapter, it generates several useful selector functions for you, including selectUserById.
    // The useSelector hook calls the selectUserById function with the state and userId as arguments. The selectUserById function looks through the users slice of the state (or wherever the user data is stored) and returns the user object that matches the provided userId.
    const navigate = useNavigate()
    if(user){
        const handleEdit = () => navigate(`/dash/users/${userId}`);
        const userRolesString = user.roles.toString().replaceAll(',' , ', ')
        const cellStatus = user.active? '' :  'table__cell--inactive'
    
    return (
        <tr className="table__row user">
            <td className={`table__cell ${cellStatus}`}>{user.username}</td>
            <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
            <td className={`table__cell ${cellStatus}`}>
                <button
                    className="icon-button table__button"
                    onClick={handleEdit}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            </td>
        </tr>
    )

} 
  else return null
}

export default User