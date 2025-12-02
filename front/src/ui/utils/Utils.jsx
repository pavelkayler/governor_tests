import { FormCheck, FormControl, FormGroup, FormLabel } from "react-bootstrap";

export const fg = (label, type, defValue, placeholder, defaultChecked) => {
  return (
    <FormGroup>
      <FormLabel column={"sm"}>{label}</FormLabel>
      <FormControl type={type} defaultValue={defValue} placeholder={placeholder} defaultChecked={defaultChecked} />
    </FormGroup>
  );
};

export const fc = (label, defaultChecked) => {
  return (
    <FormGroup>
      <FormCheck type="checkbox" label={label} defaultChecked={defaultChecked} />
    </FormGroup>
  );
};
