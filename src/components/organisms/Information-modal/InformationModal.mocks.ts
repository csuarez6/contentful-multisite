import { IModal } from "./InformationModal";

const data: IModal = {
    icon: 'check',
    title: '¡Has creado tu cuenta Vanti!',
    type: 'informative'
};
const error: IModal = {
    icon: 'alert',
    title: 'Error al realizar la orden',
    type: 'warning'
};
export const MocksModalProps = {
    data,
    error
};