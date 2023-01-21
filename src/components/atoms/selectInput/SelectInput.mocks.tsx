import { ISelectInput } from "./SelectInput";


const data: ISelectInput = {
  selectOptions: [
    {
      label: 'Seleccione',
      value: ''
    },
    {
      label: 'Value 2',
      value: 'value2'
    },
    {
      label: 'Value 3',
      value: 'value3'
    },
    {
      label: 'Value 4',
      value: 'value4'
    }
  ],
  label: 'Ipsum Dolor Amet'
};

const dataError : ISelectInput = {
  selectOptions: [
    {
      label: 'Seleccione',
      value: ''
    },
    {
      label: 'Value 2',
      value: 'value2'
    },
    {
      label: 'Value 3',
      value: 'value3'
    },
    {
      label: 'Value 4',
      value: 'value4'
    }
  ],
  label: 'Lorem Ipsum Dolor Amet',
  isError: true,
  errorMessage: 'Hay un error'
};

export const mocksSelectInputProps = {
  data,
  dataError
};