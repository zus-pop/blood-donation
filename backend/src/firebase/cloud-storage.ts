import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import multer from "multer";
import { storage } from "./firebase-config";

export const upload = multer({ storage: multer.memoryStorage() });

export async function uploadToCloud(folder: string, file: Express.Multer.File) {
  const storageRef = ref(
    storage,
    `${folder}/${Date.now()}-${file.originalname}`
  );

  const metadata = {
    contentType: file.mimetype,
  };

  const snapshot = await uploadBytesResumable(
    storageRef,
    file.buffer,
    metadata
  );

  const imageUrl = await getDownloadURL(snapshot.ref);

  return imageUrl;
}
