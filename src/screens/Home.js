import { Fragment } from "react";
import HomeHeader from "../componets/home/HomeHeader";
import TopCurrencies from "../componets/home/TopCurrencies";

const Home = () => {
    return(
        <Fragment>
            <HomeHeader />
            <TopCurrencies />
        </Fragment>
    )
}

export default Home;
