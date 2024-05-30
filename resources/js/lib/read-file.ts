import { isImage } from "./is-image";

export async function readFile(file: File): Promise<string | null> {
    return new Promise((resolve, reject) => {
        if (isImage(file)) {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        } else {
            resolve(null);
        }
    });
}