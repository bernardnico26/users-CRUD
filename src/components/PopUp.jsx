import { useEffect } from "react";

const PopUp = ({ message, type, onClose}) => {
    useEffect(() => {
        setTimeout(() => {
            onClose()
        }, 2000);
    },[onClose])
    
    return (
        <section className="pop-up-section">
            {type && (
                <div className={`pop-up ${type === 'success' ? 'success' : 'error'}`}>
                    <p>{message}</p>
                </div>
            )}
        </section>
    
    );
};

export default PopUp;