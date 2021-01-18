import React, {FC, useEffect, useState} from "react";
import axios from "axios";

interface Props {
}

export const GalleryPage: FC<Props> = (props: Props) => {
    useEffect(() => {
        axios.post(
            "http://interview.agileengine.com/auth",
            {
                apiKey: "23567b218376f79d9415"
            }
        ).then((res) => {
                const {token } = res.data
                localStorage.setItem('token', token);
            }
        );

    }, []);


    return (
        <div className="Page">
            <div className="header">Image gallery</div>

        </div>
    );
};
