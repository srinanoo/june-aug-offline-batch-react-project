import { Outlet } from "react-router-dom";
import FooterComp from "../components/FooterComp";
import HeaderComp from "../components/HeaderComp";

export default function LayoutPage() {
    return (
        <>
            <HeaderComp />

            <h1>Trainees Database</h1>

            <Outlet />

            <FooterComp />
        </>
    )
}