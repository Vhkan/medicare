'use client'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FromFieldType } from "./forms/PatientForm";

interface CustomProps {
  control: Control<any>,
  fieldType: FromFieldType,

}

const CustomFormField = ({ control, fieldType, name, label }: CustomProps) => {
  return (
    <FormField
      control={control}
      name="username"
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FromFieldType.CHECKBOX && label (
            <FormLabel>{ label }</FormLabel>
          )}
        </FormItem>
      )}
    />
  )
}

export default CustomFormField;