import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";

const Layout = ({ search, setSearch }) => {
    return (
        <div className="App">
            <Header title="React JS Blog" />
            <Nav search={search} setSearch={setSearch} />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;
