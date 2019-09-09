const router = require('express').Router();
const blogController = require('../../controllers/blogController');

router.get("/", blogController.getHome);

router.get('/createBlog', blogController.getCreateBlog);

router.post('/postBlog', blogController.postCreateBlog);

router.post('/sortByDate', blogController.postSortByDate);

router.get('/getUpdate/:postId', blogController.getUpdate);

router.post('/postUpdate', blogController.postUpdate)

module.exports = router;