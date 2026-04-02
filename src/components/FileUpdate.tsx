
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

          <input value={data.number} onChange={(e) => updateField("number", e.target.value)} />
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
          <input value={data.middleName} onChange={(e) => updateField("middleName", e.target.value)} />
          <input
            value={data.gradYear}
            placeholder="Год выпуска"
            onChange={(e) => updateField('gradYear', e.target.value)}
          />
          <input placeholder="год оканчания" value={data.issueDate} onChange={(e) => updateField("issueDate", e.target.value)} />

          <input value={data.regNumber} onChange={(e) => updateField("regNumber", e.target.value)} />

          <button disabled={!isReady} onClick={() => generateDiploma(student)}>
            Сгенерировать диплом
          </button>
          <button onClick={handleSave}>save</button>
        </div>
      )}
    </div>
  )
}   