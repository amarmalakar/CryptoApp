import { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import WatchListContext from "../../store/watchlist-context";
import Loader from "../UI/Loader";

const HistoricChart = ({ id, currency }) => {
    const watchlistCtx = useContext(WatchListContext);
    const [isLoading, setIsLoading] = useState(false);
    const [historicData, setHistoricData] = useState([]);
    const [days, setDays] = useState(30);
    
    const fetchApi = async () => {
        setIsLoading(true)
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=${days}`);
        const data = await res.json()
        setIsLoading(false)
        setHistoricData(data.prices)
    }

    useEffect(() => {
        fetchApi()
    }, [days])
    // console.log(historicData);

    if (isLoading) return <Loader />


    const chartLables = historicData.map((coin) => {
        let date = new Date(coin[0])
        let time = date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`;
        return days === 1 ? time : date.toLocaleDateString();
    })
    const chartDatasets = [
        {
            data: historicData.map((coin) => coin[1]),
            label: `Price (Past ${days} Days ) in ${currency.name} (${currency.symbol})`,
            borderColor: "rgba(75,192,192,1)",
        }
    ]
    const chartData = {
        labels: chartLables,
        datasets: chartDatasets
    }

    const chartDays = [
        { label: "24 Hours", value: 1, },
        { label: "30 Days", value: 30, },
        { label: "3 Months", value: 90, },
        { label: "1 Year", value: 365, },
    ];

    const addtoWatchList = () => watchlistCtx.addCoin(id)

    return(
        <div className="my-6">
            <div className="flex items-center justify-between mb-4">
                <select className="shadow appearance-none border rounded w-48 sm:w-52 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={days} onChange={e => setDays(e.target.value)}>
                    {chartDays.map((day, i) => (
                        <option value={day.value} key={i}>{day.label}</option>
                    ))}
                </select>
                <button
                    className="shadow rounded py-2 px-3 bg-cyan-600 dark:bg-gray-800 text-white md:mr-2" 
                    onClick={addtoWatchList}
                >
                    <i className="bi bi-plus-circle mr-2"></i>
                    <span className="hidden sm:inline-block">Add To</span> Watchlist
                </button>
            </div>

            <div className="dark:bg-gray-200">
                <Line
                    data={chartData}
                    options={{
                        elements: {
                            point: {
                                radius: 2,
                            },
                        },
                    }}
                />
            </div>
        </div>
    )
}

export default HistoricChart;