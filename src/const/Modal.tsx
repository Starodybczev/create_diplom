import type { ReactNode } from "react";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {

    return (
        <div className={`modal-overlay ${isOpen ? "active" : ""}`}>
            <div className={`modal ${isOpen ? "active" : "not_active"}`}>
                {children}
                <button className="modal_btn_close" onClick={onClose}>close</button>
            </div>
        </div>
    )
}