import { createContext, useState } from "react";

const WatchListContext = createContext({
    watchList: [],
    addCoin: (newCoin) => {},
    deleteCoin: (coinId) => {}
})

let defaultWatchList = ['bitcoin', 'ethereum', 'solana'];

export const WatchListContextProvider = (props) => {
    let dbWatchList = JSON.parse(localStorage.getItem('CoinWatchList'));
    if (!dbWatchList) {dbWatchList = defaultWatchList}
    const [watchListState, setWatchListState] = useState(dbWatchList);
    localStorage.setItem('CoinWatchList', JSON.stringify(watchListState));

    const addCoinHandler = (coinId) => {
        let newWatchListState = watchListState;
        const findCoinInList = newWatchListState.find(coin => coin === coinId);
        if (!findCoinInList) {
            newWatchListState.push(coinId);
            // setWatchListState(newWatchListState);
            localStorage.setItem('CoinWatchList', JSON.stringify(newWatchListState));
            setWatchListState(JSON.parse(localStorage.getItem('CoinWatchList')))
        } else {
            alert(`${coinId} Is Already Exists In Your Watchlist`);
        }
    }
    
    const deleteCoinHandler = (coinId) => {
        let newWatchListState = watchListState;
        let afterRemoveCoin = newWatchListState.filter(item => item !== coinId);
        setWatchListState(afterRemoveCoin)
        localStorage.setItem('CoinWatchList', JSON.stringify(afterRemoveCoin))
    }

    const contextValue = {
        watchList: watchListState,
        addCoin: addCoinHandler,
        deleteCoin: deleteCoinHandler
    }

    return <WatchListContext.Provider value={contextValue}>
        {props.children}
    </WatchListContext.Provider>
}

export default WatchListContext;