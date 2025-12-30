import { Link } from "react-router-dom";
const HeroLogo = () => {
    return (
        <div style={{flex : '1 1 350px' , maxWidth :500}}>
            <h1 className='hero-title'>
                Welcome to AI <span>Customer Support</span>
            </h1>
            <p className='hero-description'>
                We are here for you 24//7. Chat with our friendly team ,get instant help or browse our knlowledge base
            </p>
            <Link to={"/chat-support"} className="start-chat-button">
            Chat with our Support
            </Link>

        </div>
    )

}

export default HeroLogo;