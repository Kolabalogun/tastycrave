import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ibrahimdevv.tastycrave",
  projectId: "667177150026ced59ffc",
  databaseId: "667177d20036826ca552",
  userCollectionId: "6671782600258ec585f9",
  shopsCollectionId: "66730eb6002e9a18aec4",
  categoriesCollectionId: "6673123e00029f60a859",
  foodsCollectionId: "66731cf10000fc24c398",
  ordersCollectionId: "6674af04003dfa1724a2",
  statusCollectionId: "6675ba260026e0223571",
  storageId: "66717d9f002c87fca304",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);

// for avatars

const avatars = new Avatars(client);

// database
const database = new Databases(client);

// storage
const storage = new Storage(client);

// Register User
export const createUser = async (email, password, username, expoPushToken) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await database.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
        role: "user",
        expo_Id: expoPushToken,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

// Get  posts created by user
export async function checkIfUserIsInDB(email) {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("email", email)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllDocs(limit, collectionId) {
  try {
    const docs = await database.listDocuments(
      config.databaseId,
      collectionId,
      limit
        ? [Query.orderDesc("$createdAt"), Query.limit(limit)]
        : collectionId === config.shopsCollectionId
        ? [Query.orderDesc("rating")]
        : [Query.orderDesc("$createdAt")]
    );

    return docs.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getDocBaseOnQuery(limit, collectionId, query, value) {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      collectionId,
      [
        Query.orderDesc(query === "users" ? "$createdAt" : "rating"),
        Query.limit(limit),
        query === "shops" || query === "users"
          ? Query.equal(query, value)
          : query === "foodcat"
          ? Query.contains(query, value)
          : Query.search(query, value),
      ]
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

// Create  Order
export async function createDoc(form, collectionId) {
  try {
    const postId = ID.unique();

    const newPost = await database.createDocument(
      config.databaseId,
      collectionId,
      postId,
      {
        ...form,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Update Post
export async function updateDoc(form) {
  try {
    const { collectionId, documentId, ...updatedForm } = form;

    const newPost = await database.updateDocument(
      config.databaseId,
      collectionId,
      documentId,
      updatedForm
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAppStatus() {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.statusCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(1)]
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const asset = {
    type: file.mimeType,
    name: file.fileName,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        80
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Create  Post
export async function createVideoPost(form) {
  try {
    const [thumbnailUrl] = await Promise.all([uploadFile(form.image, "image")]);

    const postId = ID.unique();

    const newPost = await database.createDocument(
      config.databaseId,
      config.newsCollectionId,
      postId,
      {
        title: form.title,
        image: thumbnailUrl,
        author: form.author,
        desc: form.desc,
        creator: form.creator,
        type: form.type,
        trending: form.trending,
        documentId: postId,
        likes: [],
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

// Update Post
export async function updateVideoPost(form) {
  try {
    const { collectionId, documentId, ...updatedForm } = form;

    const newPost = await database.updateDocument(
      config.databaseId,
      collectionId,
      documentId,
      updatedForm
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

// Create Comment Post
export async function createCommentPost(form, event) {
  try {
    // Determine the collection ID based on the event flag
    const collectionId =
      event === "event"
        ? config.eventcommentsCollectionId
        : event === "ticket"
        ? config.eventTicketCollectionId
        : config.commentsCollectionId;

    // Create the document data based on whether it is an event or news comment
    const data =
      event === "event"
        ? { event_id: form.event_id, desc: form.comment, creator: form.creator }
        : event === "ticket"
        ? { ...form }
        : { news_id: form.news_id, desc: form.comment, creator: form.creator };

    // Create the new post in the database
    const newPost = await database.createDocument(
      config.databaseId,
      collectionId,
      ID.unique(),
      data
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllComments(id, event) {
  if (id) {
    try {
      const comments = await database.listDocuments(
        config.databaseId,
        event ? config.eventcommentsCollectionId : config.commentsCollectionId,
        event
          ? [Query.orderDesc("$createdAt"), Query.equal("event_id", id)]
          : [Query.orderDesc("$createdAt"), Query.equal("news_id", id)]
      );

      return comments.documents;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

// Create Comment Post
export async function deletePost(form) {
  try {
    const newPost = await database.deleteDocument(
      config.databaseId,
      form.collectionId,
      form.documentId
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}
