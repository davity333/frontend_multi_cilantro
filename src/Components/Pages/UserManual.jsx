import UserManualOrg from "../Organism/userManualOrg";
import style from '../Organism/organism.module.css'
function UserManual() {
    return ( 
        <>
        <div id={style.fondoCilantro}>
            <UserManualOrg></UserManualOrg>
        </div>
        </>
    );
}

export default UserManual;