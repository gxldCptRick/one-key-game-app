import {Link} from "react-router-dom"
export interface MainMenuLinkProps {
    path: string;
    text: string;
}

const MainMenuLink = ({path, text}: MainMenuLinkProps) => <Link className="main-menu__link" to={path}>{text}</Link>

export default MainMenuLink
