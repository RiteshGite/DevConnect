const adminAuth = (req, res, next) => {
    console.log("Admin Auth Getting checked");
    const token = "xyz";
    const isAuthorizedAdmin = token === "xyz";
    if (isAuthorizedAdmin) {
        next();
    } else {
        res.status(401).json({
            error: "unauthorized admin"
        })
    }
}

const userAuth = (req, res, next) => {
    console.log("User Auth Getting checked");
    const token = "xyz";
    const isAuthorizedAdmin = token === "xyz";
    if (isAuthorizedAdmin) {
        next();
    } else {
        res.status(401).json({
            error: "unauthorized user"
        })
    }
}

module.exports = { adminAuth, userAuth };