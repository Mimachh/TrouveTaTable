interface Attachment {
    mime?: string | null;
    type?: string | null;
}

export const isImage = (attachment: Attachment): boolean => {
    let mime = attachment.mime || attachment.type;
    if (mime) {
        mime = mime.split("/")[0]; // Access the first element of the mime array
        return mime.toLowerCase() === "image";
    }
    return false;
};
