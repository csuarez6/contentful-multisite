import { IFooter } from "@/lib/interfaces/footer-cf.interface";

const data: IFooter = {
  title: 'Somos Vanti, más formas de avanzar',
  footerText: 'Todos los derechos reservados Vanti S.A - Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur iste, porro illo ducimus quidem vero dicta officiis amet, cumque iusto dignissimos vitae, sunt dolore quis?',
  menu: [
    {
      name: 'Acerda de',
      list: [
        { name: 'Grupo Vanti', href: '#' },
        { name: 'Sostenibilidad', href: '#' },
        { name: 'Inversionistas', href: '#' },
        { name: 'Trabaja con nosotros', href: '#' },
        { name: 'Prensa', href: '#' },
        { name: 'Notificaciones Judiciales', href: '#' },
      ]
    },
    {
      name: 'Otros sitios',
      list: [
        { name: 'Grupo Vantis', href: '#' },
        { name: 'Mundo Vanti', href: '#' },
        { name: 'Empresas', href: '#' },
        { name: 'Gas Natural Vehicular', href: '#' },
        { name: 'Link', href: '#' },
      ]
    },
    {
      name: 'Ayuda',
      list: [
        { name: 'Ayuda PQRS', href: '#' },
        { name: 'Comprar', href: '#' },
        { name: 'Resolución de problemas', href: '#' },
        { name: 'Términos y condiciones', href: '#' },
        { name: 'Servicio al cliente', href: '#' },
      ]
    },
    {
      name: 'Legal',
      list: [
        { name: 'Claim', href: '#' },
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' },
      ]
    }
  ],
  social: [
    {
      name: 'facebook',
      href: '#'
    },
    {
      name: 'instagram',
      href: '#'
    },
    {
      name: 'linkedin',
      href: '#'
    },
    {
      name: 'youtube',
      href: '#'
    },
    {
      name: 'twitter',
      href: '#'
    },
  ],
};

export const mockFooterBlockProps = {
  data
};
