import HeroAnim from "../hero/HeroAnim";
import HeroLogo from "../hero/HeroLogo";
import NavBar from "./NavBar";

const Header = () =>{
    return (
        <section className="hero-section">
            <HeroLogo/>
             <div style ={{flex:"1 1 350px",display:'flex',justifyContent:"center"}}>
                <HeroAnim/>
            </div>
            <NavBar/>
        </section>

    );
}

export default Header