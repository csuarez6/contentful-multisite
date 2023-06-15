import { IModal } from "./InformationModal";

const data: IModal = {
    icon: 'check',
    title: '¡Has creado tu cuenta Vanti!',
    subtitle: '¡Bienvenido al universo de Vanti, más formas de avanzar!',
    type: 'informative'
};
const error: IModal = {
    icon: 'alert',
    title: 'Error al realizar la orden',
    subtitle: '¡Bienvenido al universo de Vanti, más formas de avanzar!',
    type: 'warning'
};
export const MocksModalProps = {
    data,
    error
};