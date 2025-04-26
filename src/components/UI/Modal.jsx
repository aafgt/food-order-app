import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, open, onClose }) => {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;

        if (open) {
            modal.showModal();
        }

        return () => modal.close();
    }, [open]);

    return (
        createPortal(
            <dialog ref={dialog} onClose={onClose} className="bg-slate-200 h-2/3 w-1/2 max-lg:w-full m-auto p-5 rounded-md shadow-md">
                {children}
            </dialog>
            , document.getElementById("modal"))
    )
}

export default Modal;