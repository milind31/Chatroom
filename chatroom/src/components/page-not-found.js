import { Link } from "react-router-dom"
import Navbar from "./navbar";

const PageNotFound = () => {
    return ( 
        <div className="not-found">
            <Navbar/>
            <br/>
            <h2>Sorry</h2>
            <p>Page cannot be found</p>
            <Link to='/users'>Take me back home...</Link>
        </div>
     );
}
 
export default PageNotFound;