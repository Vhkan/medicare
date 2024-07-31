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
import Image from "next/image";

interface CustomProps {
  control: Control<any>,
  fieldType: FromFieldType,
  name: string,
  label?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelect?: boolean,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode,    
}

//Component to render all inputs
const RenderField = ({ field, ...props }: {field: any; props: CustomProps}) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;
  switch (fieldType) {
    case FromFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image 
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'icon'}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
  
    default:
      return null;
  }
}

const CustomFormField = (props : CustomProps) => {
  const { control, fieldType, name, label } = props; 
  return (
    <FormField
      control={control}
      name="username"
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FromFieldType.CHECKBOX && label && (
            <FormLabel>{ label }</FormLabel>
          )}
          <RenderField field={field} {...props} />
          <FormMessage className="shad-error"/>
        </FormItem>
      )}
    />
  )
}

export default CustomFormField;