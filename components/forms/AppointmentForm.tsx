"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SubmitButton from "../ui/SubmitButton";
import { useState } from "react";
import { AppointmentFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/constants";
import Image from "next/image";
import { create } from "domain";
import "react-datepicker/dist/react-datepicker.css";
import { scheduler } from "timers/promises";

const AppointmentForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<"default" | "cancel" | "create" | "schedule">("default");
  
  const router = useRouter();
  const userId = "123";  // Example placeholder
  const patientId = "456"; // Example placeholder

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      case "create":
        status = "pending";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointment);

        if (newAppointment) {
          form.reset();
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`);
        }
      } 
    } catch (error) {
      console.error("Failed to create appointment:", error);
    } finally {
      setIsLoading(false);
    }
  }

  let buttonLabel = (() => {
    switch (type) {
      case "cancel":
        return "Cancel Appointment";
      case "create":
        return "Create Appointment";
      case "schedule":
        return "Schedule Appointment";
      default:
        return "Get Started";
    }
  })();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h2 className="header">New Appointment 📝</h2>
          <p className="text-dark-700">Request a new appointment in a few seconds</p>
        </section>

        {(type === "default" || type === "create" || type === "schedule") && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image || "/placeholder-image.png"}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="reason"
              label="Appointment reason"
              placeholder="Enter reason for appointment"
              disabled={type === "schedule"}
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="note"
              label="Note"
              placeholder="Enter any additional notes here"
              disabled={type === "schedule"}
            />
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton isLoading={isLoading} className={`w-full ${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"}`}>
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;