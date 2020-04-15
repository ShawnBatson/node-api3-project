const express = require("express");
const users = require("./userDb");

const router = express.Router();

router.post("/", validateUser(), (req, res) => {
    users
        .insert(req.body)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            next(err);
        });
});

router.post("/:id/posts", validateUserId(), (req, res) => {
    users
        .insert(req.body)
        .then((post) => {
            res.status(201).json(post);
        })
        .catch((err) => {
            next(err);
        });
});

router.get("/", (req, res) => {
    users
        .get()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            next(err);
        });
});

router.get("/:id", validateUserId(), (req, res) => {
    res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId(), (req, res) => {
    users
        .getUserPosts(req.params.id)
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete("/:id", (req, res) => {
    // do your magic!
});

router.put("/:id", (req, res) => {
    // do your magic!
});

//custom middleware

function validateUserId() {
    return (req, res, next) => {
        users
            .getById(req.params.id)
            .then((user) => {
                if (user) {
                    req.user = user;
                    next();
                } else {
                    res.status(400).json({
                        message: "invalid user id",
                    });
                }
            })
            .catch((err) => {
                next(err);
            });
    };
}

function validateUser() {
    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({
                message: "missing user data",
            });
        } else if (!req.body.name) {
            return res.status(400).json({
                message: "missing required name field",
            });
        }
        next();
    };
}

function validatePost() {
    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({
                message: "missing post data",
            });
        } else if (!req.body.text) {
            return res.status(400).json({
                message: "missing required text field",
            });
        }
        next();
    };
}

module.exports = router;
