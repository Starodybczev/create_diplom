import type { DiplomaData } from "../utils/data/dataExtractor";
import { saveAs } from 'file-saver';
import { createReport } from "docx-templates/lib/browser";

export default async function generateDiploma(data: DiplomaData) {
    try {
        const response = await fetch("/atestat_deplom_app.docx");

        if (!response.ok) {
            throw new Error("Файл шаблона не найден в папке public");
        }

        // Получаем данные как ArrayBuffer
        const buffer: ArrayBuffer = await response.arrayBuffer();

        // Превращаем в Uint8Array (это именно то, что хочет docx-templates)
        const template = new Uint8Array(buffer);

        const report = await createReport({
            template: template as any, // Используем as any, если типы библиотеки капризничают
            data: data,
            cmdDelimiter: ['{{', '}}'],
            //@ts-ignore
            runJs: false,
            //@ts-ignore
            noSandbox: true
        });

        const blob = new Blob([report as any], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        saveAs(blob, `Диплом_${data.lastName}.docx`);
    } catch (err) {
        console.error("Ошибка генерации:", err);
        alert('Произошла ошибка при создании файла. Подробности в консоли.');
    }
}