# Chat App using Firebase

### Objective:

Our objective is to create a working chat app using React Native Firebase SDK.

### Requirements:

1. The chats should be synced in realtime between the database and the clients.
2. The app should be scalable and be able to support a consistent increase in users.
3. The database should be maintainable with an increase in scalability.

### Solutions:

Firebase provides two databases that can suit our needs:

- Firebase Realtime Database
- Cloud Firestore

Both solutions offer:

- Client-first SDKs, with no servers to deploy and maintain
- Realtime updates

#### 1. [Firebase Realtime Database](https://rnfirebase.io/database/usage)

- The Realtime Database is a cloud-hosted database. Data is stored as JSON and synchronized in realtime to every connected client. React Native Firebase provides native integration with the Android & iOS Firebase SDKs, supporting both realtime data sync and offline capabilities.

- Realtime Database is Firebase's original database. It's an efficient, low-latency solution for mobile apps that require synced states across clients in realtime.

- Realtime Database uses a simple JSON tree data model.

#### 2. [Cloud Firestore](https://rnfirebase.io/firestore/usage)

- Firestore is a flexible, scalable NoSQL cloud database to store and sync data. It keeps your data in sync across client apps through realtime listeners and offers offline support so you can build responsive apps that work regardless of network latency or Internet connectivity.

- Cloud Firestore is Firebase's newest database for mobile app development. It builds on the successes of the Realtime Database with a new, more intuitive data model. Cloud Firestore also features richer, faster queries and scales further than the Realtime Database.

- Cloud Firestore uses the 'collection' data model.

### [Realtime Database vs Cloud Firestore](https://firebase.google.com/docs/database/rtdb-vs-firestore#what_are_some_other_important_things_to_consider)

#### [Data Model](https://firebase.google.com/docs/database/rtdb-vs-firestore#data_model)

Both Realtime Database and Cloud Firestore are NoSQL Databases.

| Realtime Database                                          | Cloud Firestore                                                                                   |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Stores data as one large JSON tree.                        | Stores data as collections of documents.                                                          |
| Simple data is very easy to store.                         | Simple data is easy to store in documents, which are very similar to JSON.                        |
| Complex, hierarchical data is harder to organize at scale. | Complex, hierarchical data is easier to organize at scale, using subcollections within documents. |
| Requires less denormalization and data flattening.         |

---

#### [Scalability](https://firebase.google.com/docs/database/rtdb-vs-firestore#scalability)

| Realtime Database                                                                                                                                                       | Cloud Firestore                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scaling requires sharding.                                                                                                                                              | Scaling is automatic.                                                                                                                                                            |
| Scale to around 200,000 concurrent connections and 1,000 writes/second in a single database. Scaling beyond that requires sharding your data across multiple databases. | Scales completely automatically. Currently, scaling limits are around 1 million concurrent connections and 10,000 writes/second. We plan to increase these limits in the future. |
| No local limits on write rates to individual pieces of data.                                                                                                            | Has limits on write rates to individual documents or indexes.                                                                                                                    |

---

#### [Reliability and Performance](https://firebase.google.com/docs/database/rtdb-vs-firestore#reliability_and_performance)

| Realtime Database                                                                                  | Cloud Firestore                                                                                                        |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Realtime Database is a regional solution.                                                          | Cloud Firestore is a regional and multi-region solution that scales automatically.                                     |
| Available in regional configurations. Databases are limited to zonal availability within a region. | Houses your data across multiple data centers in distinct regions, ensuring global scalability and strong reliability. |
| Extremely low latency, ideal option for frequent state-syncing.                                    | Available in regional or multi-regional configurations around the world.                                               |

---

#### [Presence](https://firebase.google.com/docs/database/rtdb-vs-firestore#presence)

It can be useful to know when a client is online or offline. Firebase Realtime Database can record client connection status and provide updates every time the client's connection state changes.

| Realtime Database   | Cloud Firestore                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Presence supported. | Not supported natively. You can leverage Realtime Database's support for presence by syncing Cloud Firestore and Realtime Database using Cloud Functions. |
