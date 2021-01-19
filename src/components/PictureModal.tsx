import React, {FC} from "react";
import "../styles/picture.scss"

interface Props {
    pictureUrl: string
    onClose: () => void
}

export const PictureModal: FC<Props> = (props: Props) => {

    const {pictureUrl} = props;

    return (
        <div className="photo-modal">
            <div className="picture-page-header" style={{justifyContent:'flex-end'}}>
                <span className="modal-info">
                    hover on image to double zoom
                </span>
                    <span
                        className="control-element close-modal-x"
                        onClick={props.onClose}>
                         x
                    </span>
            </div>

            <div className="modal-picture-container">
                {pictureUrl &&
                <div className="picture-container">
                        {pictureUrl &&
                        <img src={pictureUrl}
                             alt="picture"
                             className="modal-item-picture"/>
                        }

                </div>
                }

                {!pictureUrl &&
                <div>
                    Loading...
                </div>
                }
            </div>

        </div>
    );
};
