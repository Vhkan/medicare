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

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new sdk.Client();

client
  // .setEndpoint(ENDPOINT!)
  // .setProject(PROJECT_ID!)
  // .setKey(API_KEY!);
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66b17e020026edd8eb79")
  .setKey("92b45c624295e13194f2d402473fe28d445eaa0080d4ff9065025c9e45669060bf52463bb7f62223f6f3768b720f5dc300d423fba7de3a3e45fecdb13602d29e2562b83880dd5007c5e2a4c4bb4fce5fcea4945aa7d8c2a352fa19b5f61911560209afb1d5c54d9bb66a461dbe56e5d16662401560097c71606abd59d1b5b9d3");


export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);    
export const users = new sdk.Users(client); 