var express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha');//验证码npm包
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});
//验证码使用
var thisCode = "";//存储用户填写的验证码的值，初始为“ ”
router.get('/captcha', function (req, res) {

  var captcha = svgCaptcha.create();//创建验证码，是个对象，对象包含data和text两个值，text为string类型是验证码的值，data是svg图像
  res.set('Content-Type', 'image/svg+xml');
  res.status(200).send(captcha.data);//发送svg验证码图形
  console.log(captcha.text);
  thisCode = captcha.text;//用户填写的值
});
//测试ejs配置，render是否正常
router.get("/error",function(req,res){
	res.render('error');
});
//验证码验证
router.post("/verifycaptcha",function(req, res){
  var upCode = req.body.captchacode;
  if(upCode == thisCode){
  	res.send("验证码正确");
  }else{
  	res.send("验证码错误");
  }
});
module.exports = router;
