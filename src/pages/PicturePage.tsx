import React, {FC, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {PictureModal} from "../components/PictureModal";
import {InfoModal} from "../components/InfoModal";

export const PicturePage: FC<[]> = () => {

    const {id}: { id: string; } = useParams();
    const picturesIds = JSON.parse(localStorage.getItem("currentPicturesIds") || "");

    const [picture, setPicture] = useState({
        full_picture: "",
        author: "",
        camera: "",
        tags: ""
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
    const [currentPictureId, setCurrentPictureId] = useState(id);

    useEffect(() => {
        const token = localStorage.getItem('token') || '';
        axios.get(`http://interview.agileengine.com/images/${currentPictureId}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                setPicture(response.data)
            });

        return function cleanup() {
            setIsUrlModalOpen(false)
        };

    }, [currentPictureId]);


    const onNavigateHandler = (pictureId: string, direction: string) => {
        const currentPictureId = picturesIds.findIndex((item: string) => item == pictureId);

        switch (direction) {
            case 'left':
                if (currentPictureId > 0) {
                    setCurrentPictureId(picturesIds[currentPictureId - 1]);
                }
                break;
            case 'right':
                if (currentPictureId < picturesIds.length) {
                    setCurrentPictureId(picturesIds[currentPictureId + 1]);
                }
                break;
        }
    };

    const openModalHandler = () => {
        setIsModalOpen(true)
    };
    const openUrlModalHandler = () => {
        setIsUrlModalOpen(true)
    };

    // @ts-ignore
    return (
        <div className="">
            <div className="picture-page-header">
                <Link to={`/`} style={{textDecorationLine: "none"}}>
                    <span className="control-element">
                          {'< back Home'}
                    </span>

                </Link>
                <span
                    className="control-element"
                    onClick={openModalHandler}>
                         Full screen view
                    </span>
            </div>

            <div className="picture-block-container">
                <div className="navigate-item" onClick={() => onNavigateHandler(currentPictureId, 'left')}>
                        <span className="control-element">
                            {"<"}
                        </span>
                </div>

                {picture &&
                <div className="picture-container">
                        {picture && picture.hasOwnProperty('full_picture') &&
                        <img src={picture.full_picture}
                             alt="picture"
                             className="picture"/>
                        }

                        <div className="photo-info-panel">
                            <div>
                                Author: {picture && picture.hasOwnProperty('author') && picture.author}
                            </div>
                            <div>
                                Camera: {picture && picture.hasOwnProperty('camera') && picture.camera}
                            </div>
                            <div>
                                Tags: {picture && picture.hasOwnProperty('tags') && picture.tags}
                            </div>

                            <div style={{marginTop: "5px"}} onClick={openUrlModalHandler}>
                            <span className="control-element">
                                 Click here to share picture URL
                            </span>
                            </div>

                        </div>



                </div>
                }

                {!picture &&
                <div>
                    Loading...
                </div>
                }

                <div className="navigate-item" onClick={() => onNavigateHandler(currentPictureId, 'right')}>
                        <span className="control-element">
                           {">"}
                        </span>
                </div>
            </div>


            {isModalOpen && picture && picture.hasOwnProperty('full_picture') &&
            <PictureModal
                pictureUrl={picture.full_picture}
                onClose={() => setIsModalOpen(false)}
            />
            }
            {isUrlModalOpen && picture && picture.hasOwnProperty('full_picture') &&
            <InfoModal
                info={picture.full_picture}
                onClose={() => setIsUrlModalOpen(false)}
            />
            }

        </div>
    );
};
