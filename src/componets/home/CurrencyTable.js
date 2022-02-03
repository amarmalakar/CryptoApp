import millify from "millify";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CurrencyTable = ({data, symbol, search}) => {
    const [coins, setCoins] = useState(data);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setCoins(data)
    }, [data])

    useEffect(() => {
        if (searchTerm.trim().length !== 0) {
            const filteredCrypto = coins.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setCoins(filteredCrypto)
        } else {
            setCoins(data)
        }
    }, [searchTerm.length]);
    
    return(
        <Fragment>
            {search && <div>
                <input
                    type="text"
                    className="shadow appearance-none border rounded w-52 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>}

            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="overflow-hidden shadow-md">

                        <table className="min-w-full">
                            <thead className="bg-cyan-600 dark:bg-gray-900">
                                <tr>
                                    <th scope="col" className="py-3 px-2 text-xs font-medium tracking-wider text-left text-white uppercase dark:text-gray-400">Logo</th>
                                    <th scope="col" className="py-3 px-2 text-xs font-medium tracking-wider text-left text-white uppercase dark:text-gray-400">Name</th>
                                    <th scope="col" className="py-3 px-2 text-xs font-medium tracking-wider text-left text-white uppercase dark:text-gray-400">Price</th>
                                    <th scope="col" className="py-3 px-2 text-xs font-medium tracking-wider text-left text-white uppercase dark:text-gray-400">24hr Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coins.map(currency => (
                                    <tr className="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600" key={currency.id}>
                                        <td className="py-4 px-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <img src={currency.image} alt="" className="w-6 h-6" />
                                        </td>
                                        <td className="py-4 px-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <Link to={`/coin/${currency.id}`} className="underline">{currency.name}</Link>
                                        </td>
                                        <td className="py-4 px-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{symbol} {millify(currency.current_price)}</td>
                                        <td className="py-4 px-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{millify(currency.market_cap_change_percentage_24h)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CurrencyTable;
