import { useWordReader } from "../utils"
import FileUpdate from "./FileUpdate"

export default function FileReadData() {
    const {file, handleWordChange} = useWordReader()

    return (
        <div>
            <input type="file"  onChange={handleWordChange}/>
            <p>{file && file.content}</p>

            <FileUpdate file={file}/>
        </div>
    )
}