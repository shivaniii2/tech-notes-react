import DashHeader from "./DashHeader"
import DashFooter from "./DashFooter"
import { Outlet } from "react-router-dom"

const DashBoardLayout = () => {
  return (
    <>
    <DashHeader/>
       <div className="dash-container">
        <Outlet/>
        
       </div>
       <DashFooter/>
    </>
   
  )
}

export default DashBoardLayout