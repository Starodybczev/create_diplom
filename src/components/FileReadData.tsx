import { useEffect, useState } from "react"
import { useWordReader } from "../utils"
import { extractStudents } from "../utils/func/extractStudents"
import FileUpdate from "./FileUpdate"
import generateDiploma from "./generateDiploma"
import type { DiplomaData } from "../utils/data/dataExtractor"
import useModal from "../utils/hooks/useModal"
import Modal from "../const/Modal"

export default function FileReadData() {
    const { file, handleWordChange } = useWordReader()
    const { isOpen, OpenModal, CloseModal } = useModal()

    const [students, setStudents] = useState<DiplomaData[]>([])
    const [activeUser, setActiveUser] = useState<number | null>(null)

    useEffect(() => {
        if (file?.content) {
            const parrse = extractStudents(file.content)
            setStudents(parrse)
        }
    }, [file])

    const delateUser = (index_Dealate: number) => {
        setStudents((prev) => prev.filter((_, el) => el !== index_Dealate))
    }


    const handleUpdate = (index_Update: number) => {
        setActiveUser(index_Update)
        OpenModal()
    }

    const updateStudentInList = (updatedData: DiplomaData) => {
        if (activeUser !== null) {
            const newStudents = [...students]
            newStudents[activeUser] = updatedData
            setStudents(newStudents)
        }
    }



    const elem = students.map((student, index) => {
        const { firstName, lastName, middleName, series, number, regNumber, gradYear } = student;
        return (
            <div className="card">
                <h3>{firstName} {lastName} {middleName} </h3>
                <p>{series}: №{number}</p>
                <p> номер {regNumber} год {gradYear}</p>
                <div className="buttons_block">
                    <button className="button_download" onClick={() => generateDiploma(student)}>download</button>
                    <button className="btn_delate" onClick={() => delateUser(index)}>X</button>
                    <button className="btn_update" onClick={() => handleUpdate(index)}>update</button>
                </div>
            </div>
        )
    })


    return (
        <div className="block_all">
            <div className="input_block_file_types">
                <input className="btn_input_type_file" type="file" onChange={handleWordChange} />
            </div>
            <div className="card_box">{elem}</div>


            <Modal isOpen={isOpen} onClose={CloseModal}>
                <h1>Update Student</h1>
                {activeUser !== null && (
                    <FileUpdate
                        student={students[activeUser]}
                        onSave={updateStudentInList}
                    />
                )}
            </Modal>

        </div>
    )
}