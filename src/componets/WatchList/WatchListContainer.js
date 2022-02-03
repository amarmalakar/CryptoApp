import { useContext } from "react";
import WatchListContext from "../../store/watchlist-context";
import SingleCoinList from "./SingleCoinList";

const WatchListContainer = () => {
    const watchlistCtx = useContext(WatchListContext);

    const removeCoinHandler = (coinId) => {
        watchlistCtx.deleteCoin(coinId);
    }
    
    return (
        <ul>
            <li className="even:bg-white odd:bg-gray-200 dark:even:bg-gray-600 dark:odd:bg-gray-900 px-3 py-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Watchlist</h3>
                    <h3 className="font-semibold">Current</h3>
                    <h3 className="font-semibold">Change 24h</h3>
                    <h3 className="font-semibold"></h3>
                </div>
            </li>
            {watchlistCtx.watchList.map((coin, i) => (
                <SingleCoinList coinId={coin} key={i} removeCoinHandler={removeCoinHandler} />
            ))}
        </ul>
    )
}

export default WatchListContainer;