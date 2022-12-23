import { saveAs } from "file-saver";

export class FileSaver {
    saveAsFile = (data: any, fileName: string) => {
        const blob = new Blob([JSON.stringify(data)], {
            type: "text/plain;charset=utf-8",
        });
        saveAs(blob, fileName);
    };
}
