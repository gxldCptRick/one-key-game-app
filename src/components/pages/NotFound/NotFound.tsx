import { useRouteMatch } from "react-router-dom";

const NotFound = () => {
    const {path} = useRouteMatch()
    return <div>
        <h1>Uh Ohhh</h1>
        <p>Looks like {path} does not exist? double check your url.</p>
    </div>
}


export default NotFound;
