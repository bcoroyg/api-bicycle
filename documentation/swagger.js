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
            ApiKeyAuth: {
                type: "apiKey",
                in: "header",
                name: "Authorization"
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
                required: ["email", "password", "confirmPassword"],
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
                    confirmPassword: {
                        type: "string",
                    },
                },
            },
            authForgotPassword: {
                type: "object",
                required: ["email"],
                properties: {
                    email: {
                        type: "string",
                    },
                },
            },
            Bicycle: {
                type: "object",
                properties: {
                    color: {
                        type: "string",
                    },
                    model: {
                        type: "string"
                    }
                },
                example: {
                    color: "Rojo",
                    model: "X1"
                }
            },
            Reserve: {
                type : "object",
                properties: {
                    userId: {
                        type: "string", 
                    },
                    bicycleId: {
                        type: "string", 
                    },
                    from: {
                        type: "string",
                        format: "date-time",
                    },
                    to: {
                        type: "string",
                        format: "date-time",
                    },
                }
            },
            User: {
                type : "object",
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
                }
            }
        },
    },
};

const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"],
};

const openApiConfiguration = swaggerJsdoc(options);

export default openApiConfiguration;