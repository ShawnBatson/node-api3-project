const express = require("express");
const posts = require("../posts/postDb");

const postRouter = express.Router();

postRouter.get("/", validatePostId(), (req, res, nex) => {
    posts
        .get()
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((err) => {
            next(err);
        });
});

postRouter.get("/:id", validatePostId(), (req, res) => {
    res.status(200).json(req.posts);
});

postRouter.delete("/:id", validatePostId(), (req, res) => {
    posts
        .remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message: "the post has been nuked",
                });
            }
        })
        .catch((err) => {
            next(err);
        });
});

postRouter.put("/:id", validatePostId(), (req, res) => {
    posts
        .update(req.params.id, req.body)
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((err) => {
            next(err);
        });
});

// custom middleware

function validatePostId() {
    return (req, res, next) => {
        posts
            .getById(req.params.id)
            .then((post) => {
                if (post) {
                    req.post = post;
                    next();
                } else {
                    res.status(400).json({
                        message: "invalid post id",
                    });
                }
            })
            .catch((err) => {
                next(err);
            });
    };
}

module.exports = postRouter;
