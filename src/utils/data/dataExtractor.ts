
export interface DiplomaData {
series: string;       // Например, "ЖОБ" или "НОБ"
  number: string;       // Семизначный номер
  lastName: string;     // Тегі
  firstName: string;    // Аты
  middleName?: string;  // Әкесінің аты (болған жағдайда)
  gradYear: string;     // Бітірген жылы
  schoolName: string;   // Білім беру ұйымының толық атауы
  
  // Метаданные для выдачи
  issueDate: string;    // Берілген күні
  city: string;         // Елді мекен
  regNumber: string;    // Тіркеу нөмірі
  
  // Ссылки на подписи (если будешь автоматизировать)
  directorName: string;
  deputyName: string;
  classLeaderName: string;
}

export function extractDataFromText(text: string): DiplomaData {
  // 1. Очистка текста от лишних переносов строк для лучшего поиска
  const cleanText = text.replace(/\n/g, " ").replace(/\s+/g, " ");

  // 2. Поиск Серии и Номера (например: ЖОБ № 1234567)
  // Ищем 3 заглавные буквы, потом символ номера (опционально) и 7 цифр
  const serialMatch = cleanText.match(/(ЖОБ|НОБ|БТ|BD|МКТ)\s*№?\s*(\d{7})/i);

  // 3. Поиск года выпуска (4 цифры рядом со словами "жылы" или "году")
  const yearMatch = cleanText.match(/(\d{4})\s*(жылы|году|год)/i);

  // 4. Поиск даты выдачи (формат 00.00.0000 или "01" января 2021)
  const dateMatch = cleanText.match(/(\d{1,2})[\s.]([а-яА-ЯёЁ]+|\d{2})[\s.](\d{4})/);

  // 5. Поиск Регистрационного номера (обычно идет после № или слова "Тіркеу")
  const regNumMatch = cleanText.match(/(Тіркеу|регистрационный|№)\s*(?:номер)?\s*№?\s*(\d{3,})/i);

  // 6. ФИО (ищем три слова с большой буквы подряд)
  const fioMatch = cleanText.match(/([А-Я][а-яё]+)\s([А-Я][а-яё]+)\s([А-Я][а-яё]+)/);

  return {
    series: serialMatch?.[1]?.toUpperCase() || "",
    number: serialMatch?.[2] || "",
    lastName: fioMatch?.[1] || "",
    firstName: fioMatch?.[2] || "",
    middleName: fioMatch?.[3] || "",
    gradYear: yearMatch?.[1] || "",
    schoolName: "Казахская академия спорта и туризма",
    issueDate: dateMatch?.[0] || "",
    city: "г. Алматы", // Обычно для этого вуза город не меняется
    regNumber: regNumMatch?.[2] || "",
    directorName: "", // Эти поля лучше оставить для ручного ввода
    deputyName: "",
    classLeaderName: ""
  };
}