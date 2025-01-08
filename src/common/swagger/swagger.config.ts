
const customfavIcon = "https://res.cloudinary.com/dphleqb5t/image/upload/v1713724442/jc-develop/favicon-c_qlvrpv.png";      //adding our favicon to swagger

const customCss = `
    .topbar{
        animation: navanimation linear both;
        animation-range: 0 300px;
        animation-timeline: scroll(root);
        position: sticky;
        top: 0px;
        z-index: 1
    }
    .topbar-wrapper {
        content: Prueba; color: white;
    }      
    .swagger-ui .opblock .opblock-summary-description { 
        font-weight: 900 
    }
    .description .renderedMarkdown p {
        font-size: 1rem;
    }
    @keyframes navanimation {
        to {
            opacity: 0.9;
            backdrop-filter: blur(10px);
        }
    }
`

const customSiteTitle = "{ jc-develop Auth API-REST }";



const swaggerOptions = {
    customfavIcon,
    customCss,
    customSiteTitle,    
    swaggerOptions: {
        persistAuthorization: true

    },
}

const swaggerTitle = "Nest Postgres Authentication REST API - Johans Cuéllar"

const swaggerDescription = `
  <p>Prueba Backend: Desarrollo de un Módulo de Transferencias de Vehículos</p>  
  <p>Objetvo:</p>
  <p>Desarrollar un módulo CRUD para la gestión de transferencias de vehículos en un CMS vehicular. Este módulo debe implementar roles, permisos y unidades organizativas, asegurando que cada usuario solo pueda acceder a los datos del proyecto y unidades organizativas a los que pertenece</p>
  <p>Funcionalidades:</p>
  <ul>
    <li>GET/transfers</li>
    <li>POST/transfers</li>
    <li>PUT /transfers/:id</li>
    <li>DELETE /transfers/:id</li>
  </ul>
`

export {
    swaggerOptions,
    swaggerTitle,
    swaggerDescription
}