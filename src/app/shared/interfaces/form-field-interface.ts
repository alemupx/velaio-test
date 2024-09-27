export interface FormFieldInterface {
  name: string;
  type: string;
  label: string;
  validators: { required?: boolean; minlength?: number; min?: number };
}
