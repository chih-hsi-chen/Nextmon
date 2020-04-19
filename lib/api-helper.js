export function extractUser(req) {
    if (!req.user) return null;
    const {
        username
    } = req.user;
    return {
        username
    };
}