import LoginOrg from "../Organism/loginOrg";
import Curve from "../Molecules/loginMolecules/curve";
function Login() {
    return ( 
        <>
        <div className="bg-[#e7ecee]">
            <LoginOrg></LoginOrg>
            <Curve></Curve>
        </div>
        </>
     );
}

export default Login;