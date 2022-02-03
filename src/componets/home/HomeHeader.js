import millify from "millify";
import { useEffect, useState } from "react";
import Loader from "../UI/Loader";
import HeaderSortData from "./HeaderSortData";

const HomeHeader = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [globalData, setGlobalData] = useState({});
    const fetchApi = async () => {
        setIsLoading(true)
        const res = await fetch('https://api.coingecko.com/api/v3/global');
        const data = await res.json()
        setIsLoading(false)
        setGlobalData(data.data)
    }

    useEffect(() => {
        fetchApi()
    }, [])

    if (isLoading) return <Loader />

    return(
        <div className="max-w-screen-lg m-auto">
            <h1 className="text-2xl sm:text-3xl font-semibold text-cyan-600 dark:text-gray-900">Global Cryptocurrency</h1>

            <div className="flex flex-wrap my-4">
                <HeaderSortData head="Total Cryptocurrency" data={globalData.active_cryptocurrencies} />
                <HeaderSortData head="Total Markets" data={globalData.markets} />
                <HeaderSortData 
                    head="Last changes in 24hr."
                    data={typeof globalData.market_cap_change_percentage_24h_usd === 'number' ? millify(globalData.market_cap_change_percentage_24h_usd)+`%` : globalData.market_cap_change_percentage_24h_usd+`%`}
                />
            </div>
        </div>
    )
}

export default HomeHeader;
