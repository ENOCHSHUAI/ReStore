import { Container, CssBaseline, createTheme, Box } from "@mui/material";
import Header from "./Header";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import agent from "../api/agent";
import { getCookie } from "../util/util";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";
import WebSocketDemo from "../../components/WebSocketDemo"; // 更新路径

function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buyerId = getCookie('buyerId');
        if (buyerId) {
            agent.Basket.get()
                .then(basket => dispatch(setBasket(basket)))
                .catch(error => console.log(error))
                .finally(() => setLoading(false));
        } else {
            setLoading(false)
        }
    }, [dispatch]);

    const [darkMode, setDarkMode] = useState(false);
    const paletteType = darkMode ? 'dark' : 'light';
    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: {
                default: paletteType === 'light' ? '#eaeaea' : '#121212'
            }
        }
    });

    function handleThemeChange() {
        setDarkMode(!darkMode);
    }

    if (loading) return <LoadingComponent message="Initialising" />;

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
            <CssBaseline />
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
            <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Container maxWidth="lg">
                    <WebSocketDemo /> {/* 添加 WebSocketDemo 组件 */}
                    <Outlet />
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default App;
