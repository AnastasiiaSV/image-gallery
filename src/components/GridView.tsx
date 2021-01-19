import React, {FC, useEffect, useState} from "react";
import {Link} from 'react-router-dom';

import "../styles/gallery.scss"
import "../styles/picture.scss"
import "../styles/general.scss"

import axios from "axios";

interface Props {
}

export const GridView: FC<Props> = () => {

    const [pictures, setPictures] = useState([]);
    const [currentGalleryPage, setCurrentGalleryPage] = useState(1);

    const [picturesIds, setPicturesIds] = useState([""]);

    useEffect(() => {
        const token = localStorage.getItem('token') || '';
        axios.get("http://interview.agileengine.com/images?page=" + currentGalleryPage,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                setPictures(response.data.pictures);

                const currentPicturesIds: string[] = [];
                response.data.pictures.forEach((picture: { id: string; }) => {
                    currentPicturesIds.push(picture.id)
                });

                setPicturesIds(currentPicturesIds);
                localStorage.setItem("currentPicturesIds", JSON.stringify(currentPicturesIds));
            })
    }, []);

    const loadMore = () => {
        const token = localStorage.getItem('token') || '';
        axios.get("http://interview.agileengine.com/images?page=" + (currentGalleryPage + 1),
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                // @ts-ignore
                setPictures(prevState => {
                    return [...prevState, ...response.data.pictures];
                });

                const currentPicturesIds: any[] = [];
                response.data.pictures.forEach((picture: { id: any; }) => {
                    currentPicturesIds.push(picture.id)
                });
                localStorage.setItem("currentPicturesIds", JSON.stringify([...picturesIds, ...currentPicturesIds]));

                setPicturesIds(prevState => {
                    return [...prevState, ...currentPicturesIds];
                });

                setCurrentGalleryPage(prevState => {
                    return prevState + 1;
                })
            })
    };


    return (
        <div style={{overflowX: 'hidden'}}>
            <div className="gallery">

                {pictures &&
                pictures.map((picture: any) =>
                    <div className="gallery-item" key={picture.id}>
                        {picture && picture.hasOwnProperty('cropped_picture') &&
                        <Link to={`/picture/${picture.id}`}>
                            <img src={picture.cropped_picture}
                                 alt="picture"
                                 className="gallery-item-picture"/>
                        </Link>
                        }
                    </div>
                )
                }

            </div>

            <div className="load-more-container">
                <span className="control-element" onClick={loadMore}>
                    Load more ...
                </span>
            </div>

        </div>
    );
};
