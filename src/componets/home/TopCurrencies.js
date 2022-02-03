import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UiContext from "../../store/ui-context";
import Loader from "../UI/Loader";
import CurrencyTable from "./CurrencyTable";

const TopCurrencies = () => {
    const uiCtx = useContext(UiContext);
    const [isLoading, setIsLoading] = useState(false);
    const [topCurr, setTopCurr] = useState([]);
    
    const fetchApi = async () => {
        setIsLoading(true)
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${uiCtx.currency.name}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`);
        const data = await res.json()
        setIsLoading(false)
        setTopCurr(data)
    }

    useEffect(() => {
        fetchApi()
    }, [])

    if (isLoading) return <Loader />;
    
    return(
        <div className="max-w-screen-lg m-auto">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Top performing coins in last 24hr.</h2>
            <CurrencyTable data={topCurr} symbol={uiCtx.currency.symbol} />
        </div>
    )
}

export default TopCurrencies;
