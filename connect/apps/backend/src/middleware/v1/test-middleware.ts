export const testMiddleware = (req, res, next) => {
    req.query.filename = 'test-file';
    req.user = {
        "userId": "dhruv",
        "role": "editor"
    }
    console.log('Middleware executed');
    next();
}