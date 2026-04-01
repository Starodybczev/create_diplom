import { useDiplomaParser, type FileType } from "../utils"
import type { DiplomaData } from "../utils/data/dataExtractor";
import generateDiploma from "./generateDiploma"

interface FileUpdateProps {
    file: FileType | null
}

export default function FileUpdate({file}: FileUpdateProps){
    const {data, updateField, isReady} = useDiplomaParser(file?.content)

    return(
        <div>
            {file && (
        <div className="form">
          <h3>Проверьте данные:</h3>
          <input 
            value={data.lastName} 
            placeholder="Фамилия"
            onChange={(e) => updateField('lastName', e.target.value)} 
          />
          <input 
            value={data.firstName} 
            placeholder="Имя"
            onChange={(e) => updateField('firstName', e.target.value)} 
          />
          <input 
            value={data.gradYear} 
            placeholder="Год выпуска"
            onChange={(e) => updateField('gradYear', e.target.value)} 
          />
          
          <button disabled={!isReady} onClick={() => generateDiploma(data as DiplomaData)}>
            Сгенерировать диплом
          </button>
        </div>
      )}
        </div>
    )
}   