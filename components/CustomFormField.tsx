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
const RenderField = ({ field: props }: {field: any; props: CustomProps}) => {
  return (
    <Input
      type="text"
      placeholder="John Doe"
    />     
  )
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
          <RenderField field={field} props={props}/>
          <FormMessage className="shad-error"/>
        </FormItem>
      )}
    />
  )
}

export default CustomFormField;