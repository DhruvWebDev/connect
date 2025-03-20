import { arrayBuffer } from "stream/consumers";
import * as helper from "@repo/helper"
import { file } from "bun";
export async function hashPassword(password: string): Promise<string> {
    const bcryptHash = await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: 4, // number between 4-31
    });
    return bcryptHash;
}

export async function MatchPassword(password: string, bcryptHash: string): Promise<Boolean> {
    const isMatch = await Bun.password.verify(password, bcryptHash);

    return isMatch;
}

export async function uploadVideoToS3(formData: FormData): Promise<Array<string>> {
    const urlArray: string[] = [];
    for (const [_, file] of formData.entries()) {
        if (file instanceof File) { // Check if the entry is a File
            const fileBuffer = await file.arrayBuffer(); // Convert file to ArrayBuffer

            // Upload the video to S3
            const filename = file.name; // Use the file name
            const result = await helper.s3.write(filename, fileBuffer);
            urlArray.push(result.url);
        }
    }

    return urlArray;
}