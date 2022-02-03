import millify from "millify";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UiContext from "../../store/ui-context";

const SingleCoinList = ({coinId, removeCoinHandler}) => {
    const uiCtx = useContext(UiContext);
    // console.log(uiCtx);
    const [isLoading, setIsLoading] = useState(false);
    const [coin, setCoin] = useState('');
    const fetchApi = async () => {
        setIsLoading(true)
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
        const data = await res.json()
        setIsLoading(false)
        setCoin(data)
    }

    useEffect(() => {
        fetchApi()
    }, [coinId])
    // console.log(coin);

    if (isLoading) return <li className="even:bg-white odd:bg-gray-100 dark:even:bg-gray-700 dark:odd:bg-gray-800 p-2">
        <h3 className="font-semibold">Loading...</h3>
    </li>

    if (coin.error === "Could not find coin with the given id") {
        return <li className="even:bg-white odd:bg-gray-100 dark:even:bg-gray-700 dark:odd:bg-gray-800 p-2">
            <h3 className="font-semibold">Could not find coin</h3>
        </li>
    }

    return(
        <li className="even:bg-white odd:bg-gray-100 dark:even:bg-gray-700 dark:odd:bg-gray-800 p-2">
            <div className="flex items-center justify-between">
                <Link to={`/coin/${coinId}`} className="flex items-center underline">
                    <img src={coin?.image?.large} alt={coin.name} className="w-4 h-4 mr-2" />
                    <h4>{coin.name}</h4>
                </Link>
                <p>
                    {uiCtx.currency.symbol}{typeof coin?.market_data?.current_price[uiCtx.currency.name.toLowerCase()] === 'number' ?
                    millify(coin?.market_data?.current_price[uiCtx.currency.name.toLowerCase()]) : 
                    coin?.market_data?.current_price[uiCtx.currency.name.toLowerCase()]}
                </p>
                <p>
                    {typeof coin?.market_data?.price_change_percentage_14d_in_currency[uiCtx.currency.name.toLowerCase()] === 'number' ?
                    millify(coin?.market_data?.price_change_percentage_14d_in_currency[uiCtx.currency.name.toLowerCase()]) : 
                    coin?.market_data?.price_change_percentage_14d_in_currency[uiCtx.currency.name.toLowerCase()]}%
                </p>
                <button onClick={() => removeCoinHandler(coinId)} title="Remove"><i className="bi bi-file-x"></i></button>
            </div>
        </li>
    )
}

export default SingleCoinList;
