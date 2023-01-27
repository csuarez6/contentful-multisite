import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const data :IPromoBlock = {
    title: '¿Como agendar una cita?',
    subtitle: 'A continuación podrás encontrar el paso a paso para poder agendar tu cita',
    links:[
        {
            href: 'https://www.youtube.com/watch?v=KbTBQ7CJNdc',
            name:'linea de atencion'
        }
    ]
};
const twoVideos: IPromoBlock = {
    title: '¿Como agendar una cita?',
    subtitle: 'A continuación podrás encontrar el paso a paso para poder agendar tu cita',
    links:[
        {
            href: 'https://www.youtube.com/watch?v=KbTBQ7CJNdc',
            name:'linea de atencion'
        },
        {
            href: 'https://www.youtube.com/watch?v=a4FsJk8_6KM',
            name: 'adquirir vanti'
        }
    ]
};
export const mockVideoBlockProps = {
    data,
    twoVideos,
};