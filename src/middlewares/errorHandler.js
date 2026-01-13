const errorHandler = (err, req, res, next) => {

    // Mongoose validation error
    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            errors: Object.values(err.errors).map(e => e.message)
        });
    }

    // Mongo duplicate key
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
