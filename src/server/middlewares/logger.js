export const logRequests = function (req, res, next) {
    console.log(req.method, req.url)
    next();
}