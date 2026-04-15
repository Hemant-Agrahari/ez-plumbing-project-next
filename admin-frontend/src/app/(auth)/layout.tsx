"use client"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
export default function RootLayout({ children }: any) {
    return (
        <>
            <div>{children}</div>
            <ToastContainer />
        </>
    );
}
