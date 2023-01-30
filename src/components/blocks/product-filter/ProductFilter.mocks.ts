import { IProductFilterBlock } from '@/lib/interfaces/product-cf.interface';
import { data as productsData } from "../product-featured/FeaturedProductBlock.mock";

const data: IProductFilterBlock = {
    products: productsData,
    facets: [
        {
            listedContents: [
                {
                  text: 'Value 1',
                  value: 'value1'
                },
                {
                  text: 'Value 2',
                  value: 'value2'
                },
                {
                  text: 'Value 3',
                  value: 'value3'
                },
                {
                  text: 'Value 4',
                  value: 'value4'
                },
                {
                  text: 'Value 5',
                  value: 'value5'
                },
                {
                  text: 'Value 6',
                  value: 'value6'
                },
                {
                  text: 'Value 7',
                  value: 'value7'
                }
            ],
            placeholder: 'Marca'
        },
        {
            listedContents: [
                {
                  text: 'Value 1',
                  value: 'value1'
                },
                {
                  text: 'Value 2',
                  value: 'value2'
                },
                {
                  text: 'Value 3',
                  value: 'value3'
                },
                {
                  text: 'Value 4',
                  value: 'value4'
                },
                {
                  text: 'Value 5',
                  value: 'value5'
                },
                {
                  text: 'Value 6',
                  value: 'value6'
                },
                {
                  text: 'Value 7',
                  value: 'value7'
                }
            ],
            placeholder: 'Capacidad'
        },
        {
            listedContents: [
                {
                  text: 'Value 1',
                  value: 'value1'
                },
                {
                  text: 'Value 2',
                  value: 'value2'
                },
                {
                  text: 'Value 3',
                  value: 'value3'
                },
                {
                  text: 'Value 4',
                  value: 'value4'
                },
                {
                  text: 'Value 5',
                  value: 'value5'
                },
                {
                  text: 'Value 6',
                  value: 'value6'
                },
                {
                  text: 'Value 7',
                  value: 'value7'
                }
            ],
            placeholder: 'Tamaño'
        },
        {
            listedContents: [
                {
                  text: 'Value 1',
                  value: 'value1'
                },
                {
                  text: 'Value 2',
                  value: 'value2'
                },
                {
                  text: 'Value 3',
                  value: 'value3'
                },
                {
                  text: 'Value 4',
                  value: 'value4'
                },
                {
                  text: 'Value 5',
                  value: 'value5'
                },
                {
                  text: 'Value 6',
                  value: 'value6'
                },
                {
                  text: 'Value 7',
                  value: 'value7'
                }
            ],
            placeholder: 'Precio'
        },
        {
            listedContents: [
                {
                  text: 'Value 1',
                  value: 'value1'
                },
                {
                  text: 'Value 2',
                  value: 'value2'
                },
                {
                  text: 'Value 3',
                  value: 'value3'
                },
                {
                  text: 'Value 4',
                  value: 'value4'
                },
                {
                  text: 'Value 5',
                  value: 'value5'
                },
                {
                  text: 'Value 6',
                  value: 'value6'
                },
                {
                  text: 'Value 7',
                  value: 'value7'
                }
            ],
            placeholder: 'Ordenar Por'
          },
    ]
};


export const mockProductFilterProps = {
    data
};
