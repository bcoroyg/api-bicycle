import swaggerJsdoc from 'swagger-jsdoc';
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Documentacion de API",
        version: "1.0.1",
    },
    servers: [
        {
            url: "http://localhost:4000/api/v1",
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            }
        },
        schemas: {
            authLogin: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                },
            },
            authRegister: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                    name: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                },
            },
        },
    },
};

const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"],
};

const openApiConfiguration = swaggerJsdoc(options);

export default openApiConfiguration;