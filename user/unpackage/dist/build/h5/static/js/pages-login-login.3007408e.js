(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{"059c":function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 页面左右间距 */\n/* 文字尺寸 */.u-toast[data-v-625422f2]{position:fixed;z-index:-1;-webkit-transition:opacity .3s;transition:opacity .3s;text-align:center;color:#fff;border-radius:%?8?%;background:#585858;height:%?80?%;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?28?%;opacity:0;pointer-events:none;padding:0 %?40?%}.u-toast.u-show[data-v-625422f2]{opacity:1}.u-text[data-v-625422f2]{word-break:keep-all;white-space:nowrap;line-height:normal}.u-icon[data-v-625422f2]{margin-right:%?10?%;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;line-height:normal}.u-position-center[data-v-625422f2]{left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}.u-position-top[data-v-625422f2]{left:50%;top:20%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}.u-position-bottom[data-v-625422f2]{left:50%;bottom:20%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}.u-type-primary[data-v-625422f2]{color:#2979ff;background-color:#ecf5ff;border:1px solid #d7eafe}.u-type-success[data-v-625422f2]{color:#19be6b;background-color:#dbf1e1;border:1px solid #bef5c8}.u-type-error[data-v-625422f2]{color:#fa3534;background-color:#fef0f0;border:1px solid #fde2e2}.u-type-warning[data-v-625422f2]{color:#f90;background-color:#fdf6ec;border:1px solid #faecd8}.u-type-info[data-v-625422f2]{color:#909399;background-color:#f4f4f5;border:1px solid #ebeef5}.u-type-default[data-v-625422f2]{color:#fff;background-color:#585858}',""]),t.exports=n},"2d6b":function(t,n,e){var i=e("059c");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=e("4f06").default;o("0bd460b4",i,!0,{sourceMap:!1,shadowMode:!1})},5430:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var i={uIcon:e("d5b0").default},o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"u-toast",class:[t.isShow?"u-show":"","u-type-"+t.tmpConfig.type,"u-position-"+t.tmpConfig.position],style:{zIndex:t.uZIndex}},[e("v-uni-view",{staticClass:"u-icon-wrap"},[t.tmpConfig.icon?e("u-icon",{staticClass:"u-icon",attrs:{name:t.iconName,size:30,color:t.tmpConfig.type}}):t._e()],1),e("v-uni-text",{staticClass:"u-text"},[t._v(t._s(t.tmpConfig.title))])],1)},a=[]},"5a73":function(t,n,e){"use strict";e.r(n);var i=e("7a42"),o=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a},"5fd6":function(t,n,e){"use strict";(function(t){e("c975"),e("d3b7"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{tel:"",pwd:"",typeG:"",title:"",position:"center",icon:!0,url:"",userInfo:{},hasUserInfo:!1}},computed:{inputStyle:function(){var t={};return this.tel&&(t.color="#fff",t.backgroundColor=this.$u.color["warning"]),t}},methods:{issueBtn:function(){uni.reLaunch({url:"/pages/register/register"})},login:function(){uni.showLoading({title:"登录中...",mask:!0});var n=this;t.callFunction({name:"user-center",data:{action:"login",params:{username:n.tel,password:n.pwd}},success:function(t){0==t.result.code?(n.typeG="success",uni.setStorageSync("uni_id_token",t.result.token),uni.setStorageSync("uni_id_token_expired",t.result.tokenExpired),uni.setStorageSync("uid",t.result.uid),uni.setStorageSync("userInfo",t.result.userInfo),setTimeout((function(){uni.hideLoading(),uni.switchTab({url:"/pages/index/index"})}),700)):(n.typeG="error",uni.hideLoading()),n.$refs.uToast.show({title:t.result.msg,position:n.position,type:n.typeG,icon:n.icon,url:n.url})},fail:function(t){uni.hideLoading(),console.error(t),n.title="登录失败，请稍后再试",n.$refs.uToast.show({title:n.title,position:n.position,type:n.typeG,icon:n.icon,url:n.url})}})},WXlogin:function(){var n=this;uni.showLoading({title:"登录中...",mask:!0}),new Promise((function(t,n){uni.getProvider({service:"oauth",success:function(n){t(n.provider)},fail:function(t){n(new Error(t.errMsg))}})})).then((function(t){return new Promise((function(n,e){uni.login({provider:t,success:function(e){console.log(e),n({code:e.code,provider:t})},fail:function(t){e(new Error(t.errMsg))}})}))})).then((function(n){var e=n.code,i=n.provider;return t.callFunction({name:"user-center",data:{action:i.indexOf("weixin")>-1?"loginByWeixin":"loginByAlipay",params:{code:e}}})})).then((function(t){if(console.log(t),0!==t.result.code)throw new Error(t.result.msg);uni.hideLoading(),uni.setStorageSync("uni_id_token",t.result.token),uni.setStorageSync("uni_id_token_expired",t.result.tokenExpired),uni.setStorageSync("uid",t.result.uid),uni.setStorageSync("openid",t.result.openid),n.getuserinfo(),uni.reLaunch({url:"/pages/index/index"})})).catch((function(t){uni.hideLoading(),uni.showModal({content:t.message||"登录失败",showCancel:!1})}))},getuserinfo:function(){var t,n=this;try{var e=uni.getStorageSync("openid");e&&(console.log(e),t=e)}catch(i){}uni.showLoading({title:"处理中..."}),console.log(1),uni.getUserInfo({success:function(e){t&&(console.log("getUserInfo接口返回：",e.userInfo),n.userInfo=e.userInfo,uni.setStorageSync("userInfo1",n.userInfo),n.userInfo.score=0,n.hasUserInfo=!0,uni.hideLoading()),console.log(2)},fail:function(){uni.hideLoading(),uni.showToast({title:"为了更好的功能体验，请先登录授权！",icon:"none"}),console.log("请点击授权进行登录！"),console.log(3)}})}}};n.default=i}).call(this,e("a9ff")["default"])},"7a42":function(t,n,e){"use strict";e("c975"),e("a9e3"),e("b64b"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={name:"u-toast",props:{zIndex:{type:[Number,String],default:""}},data:function(){return{isShow:!1,timer:null,config:{params:{},title:"",type:"",duration:2e3,isTab:!1,url:"",icon:!0,position:"center",callback:null,back:!1},tmpConfig:{}}},computed:{iconName:function(){if(["error","warning","success","info"].indexOf(this.tmpConfig.type)>=0&&this.tmpConfig.icon){var t=this.$u.type2icon(this.tmpConfig.type);return t}},uZIndex:function(){return this.isShow?this.zIndex?this.zIndex:this.$u.zIndex.toast:"999999"}},methods:{show:function(t){var n=this;this.tmpConfig=this.$u.deepMerge(this.config,t),this.timer&&(clearTimeout(this.timer),this.timer=null),this.isShow=!0,this.timer=setTimeout((function(){n.isShow=!1,clearTimeout(n.timer),n.timer=null,"function"===typeof n.tmpConfig.callback&&n.tmpConfig.callback(),n.timeEnd()}),this.tmpConfig.duration)},hide:function(){this.isShow=!1,this.timer&&(clearTimeout(this.timer),this.timer=null)},timeEnd:function(){if(this.tmpConfig.url){if("/"!=this.tmpConfig.url[0]&&(this.tmpConfig.url="/"+this.tmpConfig.url),Object.keys(this.tmpConfig.params).length){var t="";/.*\/.*\?.*=.*/.test(this.tmpConfig.url)?(t=this.$u.queryParams(this.tmpConfig.params,!1),this.tmpConfig.url=this.tmpConfig.url+"&"+t):(t=this.$u.queryParams(this.tmpConfig.params),this.tmpConfig.url+=t)}this.tmpConfig.isTab?uni.switchTab({url:this.tmpConfig.url}):uni.navigateTo({url:this.tmpConfig.url})}else this.tmpConfig.back&&this.$u.route({type:"back"})}}};n.default=i},"7b30":function(t,n,e){"use strict";e.r(n);var i=e("5430"),o=e("5a73");for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("b98c");var r,s=e("f0c5"),u=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"625422f2",null,!1,i["a"],r);n["default"]=u.exports},"81a1":function(t,n,e){"use strict";e.r(n);var i=e("cd9b"),o=e("c502");for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("ed9a");var r,s=e("f0c5"),u=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"4a379329",null,!1,i["a"],r);n["default"]=u.exports},b98c:function(t,n,e){"use strict";var i=e("2d6b"),o=e.n(i);o.a},c502:function(t,n,e){"use strict";e.r(n);var i=e("5fd6"),o=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a},c75f:function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 页面左右间距 */\n/* 文字尺寸 */.wrap[data-v-4a379329]{font-size:%?28?%;position:absolute;top:0;width:100%}.wrap .weixLogin[data-v-4a379329]{width:100%;margin-top:50%}.wrap .weixLogin .weixLoginBox[data-v-4a379329]{width:300px;margin:40px auto 0}.wrap .weixLogin .getCaptcha[data-v-4a379329]{background-color:#19be6b;color:#fff;border:none;font-size:%?30?%;padding:%?12?% 0}.wrap .weixLogin .getCaptcha[data-v-4a379329]::after{border:none}.wrap .content[data-v-4a379329]{width:%?600?%;margin:%?80?% auto 0}.wrap .content .title[data-v-4a379329]{text-align:left;font-size:%?60?%;font-weight:500;margin-bottom:%?100?%}.wrap .content uni-input[data-v-4a379329]{text-align:left;margin-bottom:%?10?%;padding-bottom:%?6?%}.wrap .content .tips[data-v-4a379329]{color:#909399;margin-bottom:%?60?%;margin-top:%?8?%}.wrap .content .getCaptcha[data-v-4a379329]{background-color:#fdf3d0;color:#909399;border:none;font-size:%?30?%;padding:%?12?% 0}.wrap .content .getCaptcha[data-v-4a379329]::after{border:none}.wrap .content .alternative[data-v-4a379329]{color:#909399;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin-top:%?30?%}.wrap .buttom .loginType[data-v-4a379329]{display:-webkit-box;display:-webkit-flex;display:flex;padding:%?350?% %?150?% %?150?% %?150?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.wrap .buttom .loginType .item[data-v-4a379329]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;color:#606266;font-size:%?28?%}.wrap .buttom .hint[data-v-4a379329]{padding:%?20?% %?40?%;font-size:%?20?%;color:#909399}.wrap .buttom .hint .link[data-v-4a379329]{color:#f90}',""]),t.exports=n},cd9b:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var i={uToast:e("7b30").default,uIcon:e("d5b0").default},o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"wrap"},[e("v-uni-view",{staticClass:"u-demo-area"},[e("u-toast",{ref:"uToast",attrs:{type:t.typeG}})],1),e("v-uni-view",[e("v-uni-view",{staticClass:"top"}),e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"title"},[t._v("欢迎登录")]),e("v-uni-input",{staticClass:"u-border-bottom",staticStyle:{"border-bottom":"1px solid #f0f1f3"},attrs:{type:"number",placeholder:"请输入手机号"},model:{value:t.tel,callback:function(n){t.tel=n},expression:"tel"}}),e("v-uni-view",{staticClass:"tips"}),e("v-uni-input",{staticClass:"u-border-bottom",attrs:{type:"number",placeholder:"请输入密码"},model:{value:t.pwd,callback:function(n){t.pwd=n},expression:"pwd"}}),e("v-uni-button",{staticClass:"getCaptcha",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.login.apply(void 0,arguments)}}},[t._v("登录")]),e("v-uni-view",{staticClass:"alternative"},[e("v-uni-view",{staticClass:"password"},[t._v("忘记密码")]),e("v-uni-view",{staticClass:"issue",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.issueBtn()}}},[t._v("注册")])],1)],1),e("v-uni-view",{staticClass:"buttom"},[e("v-uni-view",{staticClass:"loginType"},[e("v-uni-view",{staticClass:"wechat item"},[e("v-uni-view",{staticClass:"icon"},[e("u-icon",{attrs:{size:"70",name:"weixin-fill",color:"rgb(83,194,64)"}})],1),t._v("微信")],1),e("v-uni-view",{staticClass:"QQ item"},[e("v-uni-view",{staticClass:"icon"},[e("u-icon",{attrs:{size:"70",name:"qq-fill",color:"rgb(17,183,233)"}})],1),t._v("QQ")],1)],1),e("v-uni-view",{staticClass:"hint"},[e("span",[t._v("登录代表同意")]),e("span",[t._v("并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理")])])],1)],1)],1)},a=[]},cdac:function(t,n,e){var i=e("c75f");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=e("4f06").default;o("b387b65e",i,!0,{sourceMap:!1,shadowMode:!1})},ed9a:function(t,n,e){"use strict";var i=e("cdac"),o=e.n(i);o.a}}]);