import { Link } from "react-router-dom";
import { GlobalCtx } from "../App";
import { useContext } from "react";
const Header = (props) => {
    const { globalState, setGlobalState } = useContext(GlobalCtx);
    const logout = <Link to="/">
        <h2 onClick={() => {
            window.localStorage.removeItem("token")
            setGlobalState({...globalState, token:null})
        }}>Logout</h2>
    </Link>
    return <nav>
        <Link to="/signup"><h2>SignUP</h2></Link>
        <Link to="/login"><h2>Login</h2></Link>
        {globalState.token?logout:null}
    </nav>
}
export default Header;
