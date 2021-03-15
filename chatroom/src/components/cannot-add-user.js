import { Link } from "react-router-dom"

const CannotAddUser = () => {
    return ( 
        <div>
            <br/>
            <h2>Sorry</h2>
            <p>We had trouble adding you as a user</p>
            <p>Please make sure you fill out all of the necessary information and that you aren't trying to duplicate a pre-existing username!</p>
            <Link to='/'>Try again...</Link>
        </div>
     );
}
 
export default CannotAddUser;