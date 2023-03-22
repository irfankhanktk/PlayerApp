import { WhereFilterOp } from '@firebase/firestore-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import Rnfirestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { setUserInfo } from '../../store/reducers/user-reducer';
import { UTILS } from '../../utils';

export const getCurrentUserId = () => auth()?.currentUser?.uid;

export const logout = async () => {
  await auth().signOut();
}
export const createUserWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(email, password);
    console.log('RES: SIGNUP', res);

    return res;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }
    throw UTILS.returnError(error);
  }
}
export const signInWithEmailAndPassword = async (email: string, password: string) => {

  try {
    const res = await auth().signInWithEmailAndPassword(email, password);
    return res;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }
    throw UTILS.returnError(error);
  }
}

export const uploadFile = async (image: string) => {
  try {
    if (!image) {
      throw 'image is not selected'
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);
    task.on('state_changed', taskSnapshot => {
      const percent = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
      console.log(percent, '% bytes transferred');
    });
    await task;
    const url: string = await storageRef.getDownloadURL();
    return url;
  } catch (error) {
    throw error;
  }
};


export const saveData = async (
  collection: string,
  doc: string | undefined,
  jsonObject: any,
) => {
  try {
    const ref = Rnfirestore().collection(collection);

    const obj = UTILS._removeEmptyKeys(jsonObject);
    const res = await ref.doc(doc).set(obj, { merge: true });
    return res;
  } catch (error) {
    console.log('error::', error);
    throw error;
  }
};
export const updateDocument = async (
  collection: string,
  doc: string | undefined,
  jsonObject: any,
) => {
  try {
    const ref = Rnfirestore().collection(collection);
    const obj = UTILS._removeEmptyKeys(jsonObject);
    const res = await ref.doc(doc).update(obj);
    return res;
  } catch (error) {
    console.log('error::', error);
    throw error;
  }
};
export const deleteDocument = async (
  collection: string,
  docId?: string,
) => {
  try {
    const ref = Rnfirestore().collection(collection);
    await ref.doc(docId).delete();
  } catch (error) {
    console.log('error::', error);
    throw UTILS?.returnError(error);
  }
};
export const isDocumentExists = async (
  collection: string,
  docId?: string,
) => {
  try {
    const ref = Rnfirestore().collection(collection);
    const documentSnapshot = await ref.doc(docId).get();
    return documentSnapshot.exists;
  } catch (error) {
    console.log('error::', error);
    throw UTILS?.returnError(error);
  }
};
export const getData = async (collection: string, doc: string) => {
  return Rnfirestore()
    .collection(collection)
    .doc(doc)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        return doc.data();
      } else {
        throw 'user does not exists';
      }
    }).catch(error => { throw UTILS?.returnError(error) });
};
export const getDatabyKey = async (
  collection: string,
  doc: string,
  objectKey: string,
) => {
  try {
    const ref = Rnfirestore().collection(collection);

    const res: any = await ref.doc(doc).get();
    if (res.exists) {
      return res.data()[objectKey];
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};
export const getAllOfCollection = async (collection: string) => {
  let data: any[] = [];
  let querySnapshot = null;
  querySnapshot = await Rnfirestore().collection(collection).get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
};
export const getAllOfCollection2 = async (
  collection: string,
  key: string,
  op: any,
  value: string,
) => {
  let data: any[] = [];
  let querySnapshot = null;
  querySnapshot = await Rnfirestore()
    .collection(collection)
    .where(key, op, value)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
};
export const removeItemfromArrayValue = async (
  collection: string,
  doc: string,
  array: number,
  value: any,
) => {
  let docRef = Rnfirestore().collection(collection).doc(doc);
  let docData: any = await docRef.get();

  if (docData.exists && docData && docData.data()[array] != undefined) {
    docRef.update({
      [array]: Rnfirestore.FieldValue.arrayRemove(value),
    });
  }
};
export const addToArray = async (
  collection: string,
  doc: string,
  array: string,
  value: any,
) => {
  try {
    let docRef = Rnfirestore().collection(collection).doc(doc);
    docRef.update({
      [array]: Rnfirestore.FieldValue.arrayUnion(value),
    });

  } catch (error) {
    throw UTILS.returnError(error)
  }
};
export const removeFromArray = async (
  collection: string,
  doc: string,
  arrayName: string,
  value: any,
) => {
  try {
    let docRef = Rnfirestore().collection(collection).doc(doc);
    docRef.update({
      [arrayName]: Rnfirestore.FieldValue.arrayRemove(value),
    });

  } catch (error) {
    throw UTILS.returnError(error)
  }
};
export const filterArrayCollections = async (
  collection: string,
  key: string,
  op: 'in' | 'array-contains-any',
  values: string[],
) => {
  try {
    if (!values || !values.length || !collection) return [];

    const ref = Rnfirestore().collection(collection);
    const batches = [];

    while (values.length) {
      // firestore limits batches to 10
      const batch = values.splice(0, 10);

      // add the batch request to to a queue
      batches.push(
        ref
          .where(key, op, [...batch])
          .get()
          .then(results =>
            results.docs.map(result => ({
              /* id: result.id, */ ...result.data(),
            })),
          ),
      );
    }

    // after all of the data is fetched, return it
    return Promise.all(batches).then(content => content);
  } catch (error) {
    throw new Error(UTILS.returnError(error));
  }
};
export const filterCollections = async (
  collection: string,
  key: string,
  op: WhereFilterOp,
  value: any,
) => {
  try {
    const ref = Rnfirestore().collection(collection);
    const querySnapshot = await ref?.where(key, op, value).get();
    const data: any[] = [];
    querySnapshot.forEach(documentSnapshot => {
      data?.push(documentSnapshot.data());
    });
    return data;
  } catch (error) {
    throw new Error(UTILS.returnError(error));
  }
};

//you can execute multiple write operations as a single batch that contains any combination of set,
// update, or delete operations. A batch of writes completes atomically and can write to multiple documents.
export async function insertBatch(collection: string, array: any[] = [], is_doc = true) {
  try {
    const db = Rnfirestore();
    const batch = db.batch();
    array.map(doc => {
      if (is_doc) {
        var docRef = db.collection(collection).doc(doc?.id); //set doc with your own unique id
        batch.set(docRef, doc);
      } else {
        var docRef = db.collection(collection).doc(); //automatically generate unique id
        batch.set(docRef, doc);
      }
    });
    return batch.commit();
  } catch (error) {
    console.log('error:', error);
    throw new Error(UTILS.returnError(error));
  }
}

//transaction example for like post
export const onPostLike = (postId: string) => {
  try {

    // Create a reference to the post
    const postReference = Rnfirestore().doc(`posts/${postId}`);

    return Rnfirestore().runTransaction(async transaction => {
      // Get post data first
      const postSnapshot = await transaction.get(postReference);

      if (!postSnapshot.exists) {
        throw 'Post does not exist!';
      } else
        transaction.update(postReference, {
          likes: postSnapshot?.data()?.likes + 1,
        });
    });
  } catch (error) {
    throw new Error(UTILS.returnError(error));
  }
}
