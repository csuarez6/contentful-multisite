interface FuneralPlan {
  title: string;
  description: string;
  table?: any;
  tabs?: any;
}

interface FuneralPlans {
  items: FuneralPlan[];
}

export const dataPlans: FuneralPlans = {
  items: [
    {
      title: "Plan personas",
      description: "Un producto para dar seguridad, tranquilidad y confianza a nuestros clientes, frente a la pérdida de un ser querido",
      table: {
        headings: [
          "Plan dorado",
          "Plan Platino"
        ],
        rows: [
          {
            items: ["Precio mensual", "Desde $ 17.500", "Desde $ 21.000"]
          },
          {
            items: ["Precio diario", "Desde $ 584", "Desde $ 700"]
          },
          {
            items: ["Traslado", "Para traslados de acompañantes cubre van o buseta.", "Para traslados de acompañantes cubre bus o buseta."]
          },
          {
            items: ["Cofre", "Cofre tipo plan, 2 referencias.", "Cofre tipo plan, 3 referencias."]
          }
        ]
      },
      tabs: [
        {
          title: "Cuerpo",
          icon: "body",
          items: [
            {
              title: "Asesoría en trámites para repatriación del cuerpo o cenizas."
            },
            {
              title: "Preparación del cuerpo (tanatopraxia)."
            }
          ],
        },
        {
          title: "Traslado",
          icon: "transportation",
          items: [
            {
              title: "Traslado entre ciudades (Incluye 1 traslado del cuerpo a nivel nacional sin límite de kilometraje)."
            },
            {
              title: "Traslado del cuerpo desde el sitio de fallecimiento."
            }
          ]
        },
        {
          title: "Cofre",
          icon: "coffin",
          items: [
            {
              title: "Fábrica de cofres."
            }
          ]
        },
        {
          title: "Generalidades",
          icon: "general",
          items: [
            {
              title: "Servicio a Nivel Nacional."
            },
            {
              title: "Cobertura inmediata sin periodos de carencia*"
            },
            {
              title: "Profesionales en el ámbito jurídico y psicológico dispuestos a brindarle asesoría en lo que usted necesita."
            }
          ],
          helpText: "*Por muerte accidental o violenta. Por otra causa después de 90 días."
        },
        {
          title: "Velación y sepelio",
          icon: "pray",
          items: [
            {
              title: "Sala de Velación 24 horas."
            },
            {
              title: "Arreglo Floral de cortesía."
            },
            {
              title: "Serie de carteles."
            },
            {
              title: "Recordatorio (Libro de oración, asistencia y denario)."
            },
            {
              title: "Servicio de cafetería."
            },
            {
              title: "Servicio de telefonía local."
            },
            {
              title: "Cremación – Bóveda (plan Dorado)."
            },
            {
              title: "Ceremonia religiosa."
            },
            {
              title: "Cinta impresa con el nombre del fallecido, transporte carroza fúnebre (sala – ceremonia – destino final)."
            },
            {
              title: "Si posee lote en propiedad, se asumen los costos de los derechos del cementerio hasta por 2 SMMLV."
            },
            {
              title: "Exhumación incluida, siempre que la afiliación este activa a los 4 años. No incluye cremación de restos."
            }
          ]
        },
        {
          title: "Cobertura en edades",
          icon: "coverage",
          items: [
            {
              title: "No hay límites de edad"
            }
          ]
        },
        {
          title: "Previsora",
          icon: "farsighted",
          items: [
            {
              title: "COORSERPARK SAS."
            }
          ]
        }
      ]
    },
    {
      title: "Plan mascotas",
      description: "Sabemos que para ti es importante preveer la despedida de tu amigo incondicional, por eso te brindamos este plan para afiliar a tu mascota: perro, gato, roedor, ave o mamíferos pequeños de cualquier edad.",
      table: {
        headings: [
          "Plan mascotas"
        ],
        rows: [
          {
            items: ["Precio mensual", "Desde $ 9.000 por mascota"]
          },
          {
            items: ["Precio diario", "Desde $ 300"]
          },
          {
            items: [
              "Coberturas generales",
              {
                list: [
                  "Retiro de la mascota en el lugar del fallecimiento.",
                  "Sala de velación especializada para mascotas por 3 horas.",
                  "Cofre fúnebre especial para mascotas.",
                  "Cremación colectiva."
                ]
              }
            ]
          },
          {
            items: ["Cobertura en edades", "No hay límites en edad"]
          },
          {
            items: ["Previsora", "COORSERPARK SAS."]
          }
        ]
      }
    }
  ]
}