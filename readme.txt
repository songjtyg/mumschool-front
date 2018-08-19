++++++++++++++++++++++++++++++++++++++++++++++++++++
axios发送get post请求问题
发送post请求时一般都要设置Content-Type，发送内容的类型，application/json指发送json对象但是要提前stringify一下。application/xxxx-form指发送？a=b&c=d格式，可以用qs的方法格式化一下，qs在安装axios后会自动安装，只需要组件里import一下即可。
const postData=JSON.stringify(this.formCustomer);
'Content-Type':'application/json'}

const postData=Qs.stringify(this.formCustomer);//过滤成？&=格式
'Content-Type':'application/xxxx-form'}

axios({
   url:'/api/xxxxx/xxxx.xxx',
   method:'post',
   data:postData,
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
   }
})
++图片路径解决+++++++++++++++++++++++++++++++++++++++++++++++++++
https://www.cnblogs.com/xiaojingyuan/p/7080768.html
++安装jsonp跨域请求微信授权++++++++妹用++++++++++++++++++++++++++++++++++++++++++++
1、安装vue jsonp
npm i -S vue-jsonp
2、在main.js中导入vue-jsonp
import VueJsonp from 'vue-jsonp'
通过use方法，挂载到vue中
vue.use(VueJsonp)
++++++++++++++++++++++++++++++++++++++++++++++++++
mode: 'history'
++++++++++++++++++++++++++++++++++++++++++++++
vue-cli 单页面手机应用input点击手机端虚拟键盘弹出盖住input
https://blog.csdn.net/happyElina/article/details/79900663
//微信公众平台开发(83) 生成带参数二维码
http://www.cnblogs.com/txw1958/p/weixin-qrcode-with-parameters.html1
++++++++++++++++++++多页面配置+++++++++++++++++++++++++++++++++++++++++++++++++++++++
vue多页面 https://baijiahao.baidu.com/s?id=1592180635510348407&wfr=spider&for=pc
vue 多页面 https://www.jb51.net/article/138575.htm
webpack多页应用架构专题系列：https://array_huang.coding.me/webpack-book/   ；https://www.cnblogs.com/moqiutao/p/8522293.html
