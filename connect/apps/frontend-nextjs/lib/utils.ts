import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// //Auth Function
// export async function registerUser({ fullName: string, email: string, password: string, role: string }) {
// }

// export async function verifyUser({ email: string, password: string }) {
//   const result = 
// }

// export async function getPreSignedUrl({ fileName: string }) {
// }


// //Youtuber's Endpoint

// export async function addRawVideoToDashboard({ s3Url: string, youtuberId }) {

// }

// export async function assignEditor({ videoId: string, editorId: string }) {

// }

// export async function getEditedVideoForRawVideo({ rawVideoId: string }) {

// }

// export async function updateStatusOfEditedVideo({ editedVideoId: string, status: string }) {

// }

// export async function onboardEditor({ editorId: string, youtuberId: string }) {

// }

// export async function getEditorList({ youtuberId: string }) {

// }


// // Editor's Endpoint

// export async function getAssignedVideoList({ editorId: string }) {

// }


// export async function updateVideoEditingProgress({ videoId: string, status: string }) {

// }

// export async function addRawVideoToYTDashboard({ s3Url: string, editorId: string, rawVideoId: string }) {

// }
