import { Fragment, useContext } from "react"
import AppRouters from "./AppRouters";
import Footer from "./componets/global/Footer";
import Navbar from "./componets/global/Navbar";
import UiContext from "./store/ui-context";

const App = () => {
  const uiCtx = useContext(UiContext)
  if (
    uiCtx.theme === 'dark' ||
    (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  return <Fragment>
    <Navbar />
    <div className="min-h-screen dark:bg-gray-600 dark:text-white p-4">
      <AppRouters />
    </div>
    <Footer />
  </Fragment>
}

export default App;