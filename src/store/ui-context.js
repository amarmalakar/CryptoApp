import { createContext, useState } from "react";

const UiContext = createContext({
    theme: '',
    currList: {},
    currency: {},
    changeThemeApp: () => {},
    changeThemeCurrency: (curr) => {},
})

const currListArr = [
    {name: 'inr', symbol: '₹'},
    {name: 'usd', symbol: '$'},
]

export const UiContextProvider = (props) => {
    // Getting the theme color from localStorage
    let getThemeColor = localStorage.getItem("themeColor");
    if (!getThemeColor) {getThemeColor = 'default'}
    const [themeColor, setThemeColor] = useState(getThemeColor);

    const changeThemeAppHandler = () => {
        const themeSetup = themeColor === 'default' ? 'dark' : 'default';
        setThemeColor(themeSetup)
        localStorage.setItem("themeColor", themeSetup);
        
    }

    // Currency Handler
    let getCurrency = JSON.parse(localStorage.getItem('themeCurrency'))
    if (!getCurrency) {getCurrency = {name: 'inr', symbol: '₹'}}
    const [themeCurrency, setThemeCurrency] = useState(getCurrency);
    const changeThemeCurrencyHandler = (curr) => {
        const findCurr = currListArr.find(currency => currency.name === curr)
        setThemeCurrency(findCurr)
        localStorage.setItem('themeCurrency', JSON.stringify(findCurr));
        window.location.reload()
    }

    const contextValue = {
        theme: themeColor,
        currList: currListArr,
        currency: themeCurrency,
        changeThemeApp: changeThemeAppHandler,
        changeThemeCurrency: changeThemeCurrencyHandler
    }

    return <UiContext.Provider value={contextValue}>
        {props.children}
    </UiContext.Provider>
}

export default UiContext;
