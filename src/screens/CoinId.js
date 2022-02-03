import millify from "millify";
import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HistoricChart from "../componets/CoinId/HistoricChart";
import Loader from "../componets/UI/Loader";
import WatchListContainer from "../componets/WatchList/WatchListContainer";
import UiContext from "../store/ui-context";

const CoinId = () => {
    const uiCtx = useContext(UiContext)
    const param = useParams()
    const {coinId} = param;

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
    }, [param])
    // console.log(coin);

    if (isLoading) return <Loader />

    if (coin.error === "Could not find coin with the given id") {
        return <h1 className="text-3xl sm:text-4xl font-bold text-cyan-600 dark:text-gray-900">
            Could not find coin with the given coin
        </h1>
    }

    return(
        <Fragment>
            <div className="flex items-center justify-center mb-2">
                <img src={coin?.image?.large} alt={coin.name} className="w-6 h-6 mr-2" />
                <h1 className="text-3xl sm:text-4xl font-bold text-cyan-600 dark:text-gray-900">
                    {coin.name}
                    {` (${coin.id})`}
                </h1>
            </div>
            <p className="text-center">{coin.name} live price. View value statistics, market cap and supply.</p>
            
            <div className="flex justify-center mt-2 text-lg">
                <p>
                    <span>Rank: </span>
                    <span className="font-semibold text-cyan-600 dark:text-gray-900">{coin?.market_cap_rank}</span>,&nbsp;
                </p>
                <p>
                    <span>Current Price: </span>
                    <span className="font-semibold text-cyan-600 dark:text-gray-900">
                        {typeof coin?.market_data?.current_price[uiCtx.currency.name.toLowerCase()] === 'number' ?
                        millify(coin?.market_data?.current_price[uiCtx.currency.name.toLowerCase()]) : 
                        coin?.market_data?.current_price[uiCtx.currency.name.toLowerCase()]}
                    </span>,&nbsp;
                </p>
                <p>
                    <span>Market Cap: </span>
                    <span className="font-semibold text-cyan-600 dark:text-gray-900">
                        {typeof coin?.market_data?.market_cap[uiCtx.currency.name.toLowerCase()] === 'number' ? 
                        millify(coin?.market_data?.market_cap[uiCtx.currency.name.toLowerCase()]) :
                        coin?.market_data?.market_cap[uiCtx.currency.name.toLowerCase()]}
                    </span>
                </p>
            </div>

            <div className="md:flex">
                <div className="md:flex-1">
                    <HistoricChart id={coinId} currency={uiCtx.currency} />
                </div>
                <div className="md:w-80">
                    <WatchListContainer />
                </div>
            </div>

            <div
                className="max-w-screen-lg m-auto"
                dangerouslySetInnerHTML={{ __html : coin?.description?.en }}
            ></div>
        </Fragment>
    )
}

export default CoinId;
