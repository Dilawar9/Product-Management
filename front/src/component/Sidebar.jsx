import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <ul className="sidebar">
        <li>
          <NavLink to="/dashboard">dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/product/create">Create Product</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/product/edit">Edit Product</NavLink>
        </li>
      </ul>
    </>
  );
}

export default Sidebar;