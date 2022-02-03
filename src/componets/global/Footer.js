import { useContext, useState } from "react";
import UiContext from "../../store/ui-context";

const Footer = () => {
    const uiCtx = useContext(UiContext)
    // console.log(uiCtx.currency);
    const [curr, setCurr] = useState(uiCtx.currency);
    return(
        <footer className="w-full shadow bg-cyan-600 py-4 p-2 dark:bg-gray-800">
            <div className="max-w-screen-xl m-auto flex items-center justify-between">
                <span className="text-white">&copy; 2022</span>

                <select
                    value={curr.name}
                    onChange={e => uiCtx.changeThemeCurrency(e.target.value)}
                    className="w-[5rem]"
                >
                    {uiCtx.currList.map((currency, i) => (
                        <option value={currency.name} key={i}>{currency.name}</option>
                    ))}
                </select>
            </div>
        </footer>
    )
}

export default Footer;