import "./App.css";
import { withTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { CurrentLanguage } from "./context/LanguageContext";
import { LoginPage } from "./pages/LoginPage";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import { ListsIndexPage } from "./pages/Lists/IndexPage";
import { ListsShowPage } from "./pages/Lists/ShowPage";
import "react-toastify/dist/ReactToastify.css";
import { ListItemShowPage } from "./pages/ListItems/ShowPage";

function App() {
    const [language, setLanguage] = useState();
    const [isAuth, setIsAuth] = useState();
    const [username, setUsername] = useState();

    useEffect(() => {
        if (localStorage.getItem("lang")) {
            setLanguage(localStorage.getItem("lang") ?? "en");
        }
        if (
            localStorage.getItem("theme") === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        } else {
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        }
    }, []);

    return (
        <CurrentLanguage.Provider value={{ language, setLanguage }}>
            <AuthContext.Provider
                value={{ isAuth, setIsAuth, username, setUsername }}
            >
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/lists" element={<ListsIndexPage />} />
                        <Route
                            path="/lists/:listId"
                            element={<ListsShowPage />}
                        />
                        <Route
                            path="/lists/:listId/items/:itemId"
                            element={<ListItemShowPage />}
                        />
                        <Route path="*" element={<LoginPage />} />
                    </Routes>
                </BrowserRouter>
                <ToastContainer
                    toastStyle={{ backgroundColor: "#ddddd" }}
                    bodyClassName="dark:text-white text-secondary"
                    position="bottom-right"
                    autoClose={4000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </AuthContext.Provider>
        </CurrentLanguage.Provider>
    );
}

export default withTranslation()(App);
