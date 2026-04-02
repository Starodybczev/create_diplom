import { useState } from "react";

export default function useModal(){
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const OpenModal = () => {
        setIsOpen(true)
    }
    const CloseModal = () => {
        setIsOpen(false)
    }

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    return {isOpen, OpenModal, CloseModal, toggleModal}
}