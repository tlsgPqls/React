export declare const UPLOAD_DIR = "uploads";
export declare const MAX_FILE_SIZE: number;
export declare const imageUploadOptions: {
    storage: import("multer").StorageEngine;
    fileFilter: (_req: any, file: any, callback: any) => void;
    limit: {
        fileSize: number;
    };
};
