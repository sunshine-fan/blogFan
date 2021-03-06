
import ArticleType from "../controller/ArticleType";
import CheckToken from "../middlewares/checkToken";

let express = require("express");
let router = express.Router();

router.get("/",CheckToken,function(req, res) {
    res.render("articleType/articleType");
});
router.get("/typeData",ArticleType.getArticleTypeMore);
router.delete("/",CheckToken,ArticleType.deleteArticleType);
router.post("/",CheckToken,ArticleType.addArticleType);
router.get("/articleTypeAdd",function(req, res) {
    res.render("articleAdd");
});

module.exports = router;
