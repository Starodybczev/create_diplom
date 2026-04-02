import type { DiplomaData } from "../data/dataExtractor";

export function extractStudents(text: string): DiplomaData[] {

    const rawBlocks = text.split(/(?=ФИО:)/i);
    
    return rawBlocks
        .map(block => block.trim())
        .filter(block => block.length > 10) // защита от мусора
        .map(block => parseSingleStudent(block));
}

// Выносим парсинг одного человека в отдельную подфункцию
function parseSingleStudent(block: string): DiplomaData {
    const cleanText = block.replace(/\n/g, " ").replace(/\s+/g, " ");

    const fioMatch = block.match(/ФИО:\s*([А-Я][а-яё]+)\s([А-Я][а-яё]+)\s([А-Я][а-яё]+)/);
    const serialMatch = cleanText.match(/(ЖОБ|НОБ|БТ|BD|МКТ)\s*№?\s*(\d{7})/i);
    const regNumMatch = block.match(/(?:номер|№)\s*[:№]?\s*([A-Za-zА-Яа-я0-9-]+)/i);
    const directorMatch = block.match(/Директор:\s*([А-Яа-яёЁ\s.]+)/i);

    return {
        lastName: fioMatch?.[1] || "",
        firstName: fioMatch?.[2] || "",
        middleName: fioMatch?.[3] || "",
        series: serialMatch?.[1]?.toUpperCase() || "",
        number: serialMatch?.[2] || "",
        regNumber: regNumMatch?.[1] || "",
        directorName: directorMatch?.[1]?.trim() || "",
        schoolName: "Казахская академия спорта и туризма",
        gradYear: block.match(/(\d{4})\s*(жылы|году|год)/i)?.[1] || "2020",
        issueDate: block.match(/(\d{1,2})[\s.]([а-яА-ЯёЁ]+|\d{2})[\s.](\d{4})/)?.[0] || "",
        city: "г. Алматы",
        deputyName: block.match(/Заместитель:\s*([А-Яа-яёЁ\s.]+)/i)?.[1]?.trim() || "",
        classLeaderName: block.match(/руководитель:\s*([А-Яа-яёЁ\s.]+)/i)?.[1]?.trim() || ""
    };
}