import { ID } from "node-appwrite/dist/id";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config";
import { Appointment } from "@/types/appwrite.types";
import { parseStringify } from "../utils";

export const createAppontment = async (appointment: Appointment) => {
  try {
    //Creating a new appointment
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      {
        ...appointment,
      }
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
  } 
};