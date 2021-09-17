import { paths } from "../../../constants"
import MainMenuLink from "../../mainMenuLink"
import "./Home.css"

const Home = () => {
    return <div className="page">
        <div className="main-menu__logo">
            <img className="main-menu__logo__img" src="/images/logos/main-logo.png" alt="One Key"/>
        </div>
        <div className="main_menu__options">
            <MainMenuLink path={paths.helpScreen} text="How to Play"/>
            <MainMenuLink path={paths.gameSetup} text="Start a Game" />
            <MainMenuLink path={paths.joinGame} text="Join a Game" />
        </div>
    </div>
}

export default Home;
