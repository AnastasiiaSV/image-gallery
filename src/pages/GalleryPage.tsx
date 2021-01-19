import React, {FC, useEffect} from "react";
import axios from "axios";
import {GridView} from "../components/GridView";

export const GalleryPage: FC = () => {
    useEffect(() => {
        axios.post(
            "http://interview.agileengine.com/auth",
            {
                apiKey: "23567b218376f79d9415"
            }
        ).then((res) => {
                const {token } = res.data;
                localStorage.setItem('token', token);
            }
        ).catch(() => {
            alert("Please reload Home page to update your token")
        });

    }, []);

    return (
        <div className="Page">
            <div className="header">Image gallery</div>
            <GridView/>
        </div>
    );
};
