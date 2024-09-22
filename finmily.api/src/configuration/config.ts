export default {
    port: process.env.PORT || 3000,
    secretKey: process.env.SECRET_KEY || "fghtr873896b59y4h49",

    publicRoutes: process.env.PUBLIC_ROUTES || [
        '/users/auth',
        '/manager/register',
    ]
}