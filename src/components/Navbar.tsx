import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-black text-white">
      <h1 className="text-lg font-bold">Checked</h1>
      <button onClick={handleLogout} className="text-sm">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
