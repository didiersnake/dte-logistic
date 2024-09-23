import { Route, Routes } from "react-router-dom";
import { AdminDashBoard } from "../admin/AdminDashBoard";

export default function AdminRoutes() {
    return(
        <Routes>
            <Route path="/*" element= {<AdminDashBoard/>} />
        </Routes>
    )
    
}