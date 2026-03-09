// Importuojame NavLink iš react-router, kad galėtume kurti nuorodas tarp puslapių
// NavLink leidžia žinoti, kuri nuoroda šiuo metu aktyvi (isActive)
import { NavLink } from "react-router";

function NavBar() {
  return (
    <nav className="bg-emerald-500 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-1">
      <h1 className="text-xl font-bold">My Library</h1>

      <div className="flex gap-4">
        <NavLink
          to="/" // kelias į root puslapį
          end // end nurodo, kad tiksliai '/' turi būti aktyvus, ne '/' pradžia
          className={({ isActive }) =>
            // dinamiškai priskiriame klases pagal tai, ar nuoroda aktyvi
            `nav-button ${isActive ? "nav-button-active" : "nav-button-default"}`
          }
        >
          Books
        </NavLink>

        <NavLink
          to="/addbook"
          className={({ isActive }) =>
            `nav-button ${isActive ? "nav-button-active" : "nav-button-default"}`
          }
        >
          Add Book
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
