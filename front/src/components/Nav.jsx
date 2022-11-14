import { NavLink } from "react-router-dom";


function Nav() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <span className="navbar-brand">Lietuvos savivalda</span>
                            <div className="collapse navbar-collapse">
                                <div className="navbar-nav">
                                    <NavLink to="/" end className='nav-link active'>Pagrindinis</NavLink>
                                    <NavLink to="/savivaldybes" className='nav-link active'>Savivaldybės</NavLink>
                                    <NavLink to="/paslaugos" className='nav-link active'>Paslaugos</NavLink>
                                    <NavLink to="/komentarai" className='nav-link active'>Komentarai</NavLink>
                                    <NavLink to="/logout" className='nav-link active'>Asijungti</NavLink>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
export default Nav;
