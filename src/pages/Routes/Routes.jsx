import { Route, Routes } from "react-router-dom";
import { Home } from '../Home/Home';
import { Details } from '../Details/Details';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<Details />} />
        </Routes>
    )
}

export { AppRoutes }