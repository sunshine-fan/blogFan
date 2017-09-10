'use strict';

import ArticleTypeModel from '../models/ArticleType'

class ArticleType {
	constructor(){
		this.getArticleType = this.getArticleType.bind(this);
		this.deleteArticleType = this.deleteArticleType.bind(this);
		this.addArticleType = this.addArticleType.bind(this);
		this.getArticleTypeData=this.getArticleTypeData.bind(this);
        this.getArticleTypeOther=this.getArticleTypeOther.bind(this);
	}

	/*获取类别*/
    getArticleTypeData(req, res, next){
        let status="1";
        let msg="数据查询失败";
    	return new Promise((resolve, reject) => {
            ArticleTypeModel.find({}, function (err, type) {
                if (err) {
                }
                else {
                    status="0";
                    msg="数据查询成功";
                    resolve(type,status,msg);
                }
            })
        })
    }

	getArticleType(req, res, next){
        this.getArticleTypeData(req, res, next).then(function (type,code,msg) {
            res.render("articleType",{code,msg,type});
        });
	}

	getArticleTypeOther(req, res, next){
        this.getArticleTypeData(req, res, next).then(function (type,code,msg) {
            res.render("articleAdd",{code,msg,type});
        });
	}

	deleteArticleType(req,res,next){
		let that=this;
		ArticleTypeModel.remove({"_id":req.query.articleTypeId}, function (err, article) {
			if (err) {
					res.send({
						code:"1",
						msg:err
					})
			}
			else{
				that.getArticleType(req, res, next);
			}
		})
	}

	addArticleType(req,res,next){
		let articleType = new ArticleTypeModel({
				typeName:  req.body.type
		});
		let that=this;
		articleType.save(function (err, response) {
		  if(err){
			res.render("articleType",{
				"code":"1",
				"msg":"数据新增失败"
			})
		  }
		});
	}

	updateArticleType(req,res,next){

	}
}

export default new ArticleType()