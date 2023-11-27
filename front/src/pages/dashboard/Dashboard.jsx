
import { Outlet } from "react-router-dom";
import Sidebar from "../../component/Sidebar";

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
