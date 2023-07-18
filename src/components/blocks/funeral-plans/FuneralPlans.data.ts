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
      }
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
};