import * as sdk from "node-appwrite";

type AppwriteConfig = {
  PROJECT_ID: string;
  API_KEY: string;
  ENDPOINT: string;
  DATABASE_ID: string;
  PATIENT_COLLECTION_ID: string;
  DOCTOR_COLLECTION_ID: string;
  APPOINTMENT_COLLECTION_ID: string;
  BUCKET_ID: string;
}

const {
  PROJECT_ID, API_KEY, DATABASE_ID, PATIENT_COLLECTION_ID, DOCTOR_COLLECTION_ID, APPOINTMENT_COLLECTION_ID, BUCKET_ID, ENDPOINT
} = process.env as unknown as AppwriteConfig;

const client = new sdk.Client();

client
  .setEndpoint(ENDPOINT!)
  .setProject(PROJECT_ID!)
  .setKey(API_KEY!);


export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);    
export const users = new sdk.Users(client); 