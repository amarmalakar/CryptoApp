import { useContext, useEffect, useState } from "react";
import CurrencyTable from "../componets/home/CurrencyTable";
import Loader from "../componets/UI/Loader";
import UiContext from "../store/ui-context";

const Coins = () => {
    const uiCtx = useContext(UiContext)
    
    const [isLoading, setIsLoading] = useState(false);
    const [coinList, setCoinList] = useState([]);
    const fetchApi = async () => {
        setIsLoading(true)
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${uiCtx.currency.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
        const data = await res.json()
        setIsLoading(false)
        setCoinList(data)
    }

    useEffect(() => {
        fetchApi()
    }, [])

    if (isLoading) return <Loader />
    
    return(
        <div className="max-w-screen-lg m-auto">
            <CurrencyTable data={coinList} symbol={uiCtx.currency.symbol} search />
        </div>
    )
}

export default Coins;