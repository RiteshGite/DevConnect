const errorHandler = (err, req, res, next) => {

    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            errors: Object.values(err.errors).map(e => e.message)
        });
    } 
    
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            errors: "Duplicate entry"
        });
    }

    return res.status(400).json({
        success: false,
        errors: err.message || "Something went wrong"
    });
};

module.exports = errorHandler; 
