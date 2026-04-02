
import { useDiplomaParser } from "../utils"
import type { DiplomaData } from "../utils/data/dataExtractor";
import generateDiploma from "./generateDiploma"

interface FileUpdateProps {
  student: DiplomaData;
  onSave: (updated: DiplomaData) => void;
}


export default function FileUpdate({ student, onSave }: FileUpdateProps) {
  const { data, updateField, isReady } = useDiplomaParser(student)


  const handleSave = () => {
    if (isReady) {
      onSave(data as DiplomaData)
    }
  }

  return (
    <div>
      {student && (
        <div className="form">
          <h3>Проверьте данные:</h3>

          <input className="input" value={data.number} onChange={(e) => updateField("number", e.target.value)} />
          <input
            className="input"
            value={data.lastName}
            placeholder="Фамилия"
            onChange={(e) => updateField('lastName', e.target.value)}
          />
          <input
            className="input"
            value={data.firstName}
            placeholder="Имя"
            onChange={(e) => updateField('firstName', e.target.value)}
          />
          <input className="input" value={data.middleName} onChange={(e) => updateField("middleName", e.target.value)} />
          <input
            className="input"
            value={data.gradYear}
            placeholder="Год выпуска"
            onChange={(e) => updateField('gradYear', e.target.value)}
          />
          <input className="input" placeholder="год оканчания" value={data.issueDate} onChange={(e) => updateField("issueDate", e.target.value)} />

          <input className="input" value={data.regNumber} onChange={(e) => updateField("regNumber", e.target.value)} />

          <div className="btn_update_box">
            <button className="button_download_two" disabled={!isReady} onClick={() => generateDiploma(student)}>
              download
            </button>
            <button className="save_button" onClick={handleSave}>save</button>
          </div>
        </div>
      )}
    </div>
  )
}   