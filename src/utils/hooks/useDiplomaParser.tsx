import { useState, useEffect, useCallback } from 'react';
import { extractDataFromText, type DiplomaData } from '../data/dataExtractor';


export function useDiplomaParser(initialData?: DiplomaData) {
    const [data, setData] = useState<DiplomaData>({
        series: "",
        number: "",
        lastName: "",
        firstName: "",
        middleName: "",
        gradYear: "",
        schoolName: "",

        issueDate: "",
        city: "",
        regNumber: "",

        directorName: "",
        deputyName: "",
        classLeaderName: ""
    });

    // Автоматически парсим, как только пришел текст из файла
    useEffect(() => {
        if (initialData) {
            setData(initialData);
        }
    }, [initialData]);

    // Метод для ручного обновления поля (если парсер ошибся)
    const updateField = useCallback((field: keyof DiplomaData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    }, []);

    // Проверка: все ли поля заполнены?
    const isReady = data.lastName !== "" && data.firstName !== "";

    return { data, updateField, isReady };
}