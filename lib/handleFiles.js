import { generateId } from "@/lib/index";
import firebase from "@/firebase/index";

export const uploadFile = async (mediaObj, userId, orderId, bucket) => {
  const imageBuffer = Buffer.from(mediaObj.data, "base64");
  const imageByteArray = new Uint8Array(imageBuffer);
  const path = `userFiles/${userId}/${orderId}/${mediaObj.name}`;
  const file = bucket.file(path);
  const token = generateId();
  await file.save(imageByteArray, {
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
    },
  });
  return mediaObj.name;
};

export const canDownloadFile = (order, user) => {
  return order.user.user_id === user.user_id;
};

export const getUrl = (filePath) => {
  return firebase
    .storage()
    .ref(filePath)
    .getDownloadURL()
    .then((url) => url);
};

const getB64String = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>
      resolve(reader.result.replace("data:", "").replace(/^.+,/, ""));
    reader.onerror = (error) => reject(error);
  });
};

export const encodeOrderFilesB64 = async (products) => {
  for (const product of products) {
    for (let i = 0; i < product.uploadFiles.length; i++) {
      product.uploadFiles[i] = {
        name: product.uploadFiles[i].filename,
        data: await getB64String(product.uploadFiles[i].file),
      };
    }
  }
};
