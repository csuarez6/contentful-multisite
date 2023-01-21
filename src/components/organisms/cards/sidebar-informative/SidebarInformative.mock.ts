import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data :IPromoBlock = {
    title: 'Al crear tu cuenta en Vanti podrás:',
    listedContentsCollection: {
        items: [
            {
                subtitle:'Comprar productos y servicios',
                tags:[
                    {
                        label:'Comprar gasodomésticos en linea'
                    },
                    {
                        label: 'Comprar gasodomésticos a cuotas'
                    },
                    {
                        label: 'Afiliarte a seguros y asistencias para ti y tus seres queridos'
                    },
                    {
                        label: 'Solicitar nuevos puntos de gas y Servicios complementarios como: mantenimiento, reparación e instalaciones'
                    }
                ]
            },
            {
                subtitle: 'Administrar tu consumo de gas',
                tags: [
                    {
                        label: 'Consultar tu factura'
                    },
                    {
                        label: 'Consultar tarifas y estractos'
                    },
                    {
                        label: 'Solicitar asesoría virtual'
                    }
                ]
            }
        ]
    }
};
export const mockSidebarInformativeProps ={
    data
};