import { Route, Routes } from "react-router-dom";
import CoinId from "./screens/CoinId";
import Coins from "./screens/Coins";
import Home from "./screens/Home";
import WatchList from "./screens/WatchList";

const AppRouters = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coins" element={<Coins />} />
            <Route path="/coin/:coinId" element={<CoinId />} />
            <Route path="/watchlist" element={<WatchList />} />
            {/* <Route path="/exchanges" element={<Exchange />} />
            <Route path="/news" element={<News />} /> */}
        </Routes>
    )
}

export default AppRouters;
