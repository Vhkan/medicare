"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../ui/SubmitButton";
import { useState } from "react";
import { userFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FromFieldType } from "../forms/PatientForm";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { GenderOptions } from "@/constants";
import { Label } from "@radix-ui/react-label";


const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  });

  async function onSubmit({ name, email, phone }: z.infer<typeof userFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);
      if (user) router.push(`/patients/${user.$id}/register`)
    } catch (error) {
      console.log(error);
    }
    // setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="mb-12 space-y-4">
          <h2 className="header">Welcome👋</h2>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="mb-12 space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FromFieldType.INPUT}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FromFieldType.INPUT}
            name="email"
            label="Email"
            placeholder="johndoe@email.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            control={form.control}
            fieldType={FromFieldType.PHONE_INPUT}
            name="phone"
            label="Phone number"
            placeholder="+1(555)-444 3333"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FromFieldType.DATE_PICKER}
            name="birthDate"
            label="Date of Birth"
          />

          <CustomFormField
            control={form.control}
            fieldType={FromFieldType.SKELETON}
            name="gender"
            label="Gender"
            renderSkeleton={(field: any) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option}/>
                      <Label htmlFor={option} className="cursor-point">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row"></div>
        <div className="flex flex-col gap-6 xl:flex-row"></div>
        
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>

      </form>
    </Form>
  );
};

export default RegisterForm;
