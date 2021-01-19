import React, {FC, useRef} from "react";
import "../styles/picture.scss"

interface Props {
    info: string
    onClose: () => void
}

export const InfoModal: FC<Props> = (props: Props) => {

    const {info} = props;

    const textAreaRef = useRef(null);

    const copyToClipboard = (e: any) => {
        // @ts-ignore
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        alert("URL was copied to clipboard!")
    };

    return (
        <div className="info-modal">
            <div className="picture-page-header" style={{justifyContent: 'flex-end'}}>
                <span className="modal-info">
                    copy URL and share it with friends :)
                </span>
                <span
                    className="control-element close-modal-x"
                    onClick={props.onClose}>
                         x
                    </span>
            </div>

            <div className="info-url-container">
                {info &&
                <input className="info-container" type="text" value={info} onChange={() => {
                }} ref={textAreaRef}/>
                }
                {document.queryCommandSupported('copy') &&
                <div style={{marginTop: "5px"}} onClick={copyToClipboard}>
                            <span className="control-element">
                                 Click here to copy URL
                            </span>
                </div>
                }
            </div>

        </div>
    );
};
