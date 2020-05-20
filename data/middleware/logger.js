module.exports = (format) => {
    return (req, res, next) => {
        switch (format) {
            case "short":
                console.log(`${req.method} ${req.url}`);
                break;
            case "long":
                console.log(
                    `${req.method} ${req.url} ${new Date().toISOString()} ${
                        req.ip
                    }`
                );
                next();
        }
    };
};
