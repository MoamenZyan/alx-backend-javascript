import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  let res = { photo: null, user: null };
  try {
    const photo = await uploadPhoto();
    const user = await createUser();
    res = { photo, user };
    return res;
  } catch (err) {
    return res;
  }
}
