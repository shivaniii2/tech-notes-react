import { useRouteError } from "react-router-dom";
// A hook provided by react router dom to catch any errors that may occur during routing

const ErrorPage = () =>{
    const err = useRouteError();
    console.log(err);
    return(
        <div>
            <h1>Oops ! something went wrong </h1>
            <h2>The page is not found 😔</h2>
            <h3>{err.status}: {err.statusText}</h3>
        </div>
    )
}
export default ErrorPage;