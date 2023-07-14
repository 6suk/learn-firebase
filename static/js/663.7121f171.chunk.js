"use strict";(self.webpackChunknwitter=self.webpackChunknwitter||[]).push([[663],{663:function(t,e,r){r.r(e),r.d(e,{default:function(){return j}});var n,a=r(9439),u=r(4165),o=r(5861),s=r(4802),c=r(2791),i=r(9434),p=r(8522),f=r(184),d=function(t){var e=t.setAction,r=e.addPost,n=e.setStorage,d=(0,c.useState)(""),l=(0,a.Z)(d,2),v=l[0],m=l[1],x=(0,i.v9)((function(t){return t.user})).user,g=function(){var t=(0,o.Z)((0,u.Z)().mark((function t(e){var a;return(0,u.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n(x.uid,v);case 2:return a=t.sent,t.next=5,r(x.uid,e,a);case 5:m("");case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),h=(0,s.Z)("",g,!0),Z=(0,a.Z)(h,3),y=Z[0],w=Z[1],b=Z[2];return(0,f.jsxs)("form",{action:"",onSubmit:b,className:"factoryForm",children:[(0,f.jsxs)("div",{className:"factoryInput__container",children:[(0,f.jsx)("input",{type:"text",placeholder:x?"\ub0b4\uc6a9 \uc791\uc131":"\ub85c\uadf8\uc778 \ud6c4 \uc774\uc6a9 \uac00\ub2a5 \ud569\ub2c8\ub2e4!",maxLength:120,value:y,onChange:w,className:"factoryInput__input",disabled:!x}),(0,f.jsx)("input",{type:"submit",value:"\u2192",className:"factoryInput__arrow",disabled:!x})]}),(0,f.jsx)(p.Z,{image:v,setImage:m})]})},l=r(8025),v=r(9623),m=r(2660),x=r(2481),g=r(276),h={randomUUID:"undefined"!==typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)},Z=new Uint8Array(16);function y(){if(!n&&!(n="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(Z)}for(var w=[],b=0;b<256;++b)w.push((b+256).toString(16).slice(1));function k(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return(w[t[e+0]]+w[t[e+1]]+w[t[e+2]]+w[t[e+3]]+"-"+w[t[e+4]]+w[t[e+5]]+"-"+w[t[e+6]]+w[t[e+7]]+"-"+w[t[e+8]]+w[t[e+9]]+"-"+w[t[e+10]]+w[t[e+11]]+w[t[e+12]]+w[t[e+13]]+w[t[e+14]]+w[t[e+15]]).toLowerCase()}var S=function(t,e,r){if(h.randomUUID&&!e&&!t)return h.randomUUID();var n=(t=t||{}).random||(t.rng||y)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,e){r=r||0;for(var a=0;a<16;++a)e[r+a]=n[a];return e}return k(n)},U=r(7689),j=function(){var t=(0,U.UO)().type,e=(0,i.v9)((function(t){return t.postToggle})).postFormToggle,r=function(){var t=function(){var t=(0,o.Z)((0,u.Z)().mark((function t(e,r,n){return(0,u.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,x.ET)(m.ep,{date:Date.now(),post:r,uid:e,imageUrl:n});case 2:case"end":return t.stop()}}),t)})));return function(e,r,n){return t.apply(this,arguments)}}(),e=function(){var t=(0,o.Z)((0,u.Z)().mark((function t(e,r,n){return(0,u.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,x.r7)((0,m.u7)(e),{post:r,imageUrl:n});case 2:case"end":return t.stop()}}),t)})));return function(e,r,n){return t.apply(this,arguments)}}(),r=function(){var t=(0,o.Z)((0,u.Z)().mark((function t(e){return(0,u.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,x.oe)((0,m.u7)(e));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return{addPost:t,updatePost:e,deletePost:r}}(),n=r.addPost,s=r.updatePost,p=r.deletePost,h=function(){var t=function(){var t=(0,o.Z)((0,u.Z)().mark((function t(e,r){var n,a,o;return(0,u.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n="",""===r){t.next=9;break}return a=(0,g.iH)(m.tO,"".concat(e,"/").concat(S())),t.next=5,(0,g.sf)(a,r,"data_url");case 5:return o=t.sent,t.next=8,(0,g.Jt)(o.ref);case 8:n=t.sent;case 9:return t.abrupt("return",n);case 10:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),e=function(){var t=(0,o.Z)((0,u.Z)().mark((function t(e){var r;return(0,u.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e){t.next=10;break}return t.prev=1,r=(0,g.iH)(m.tO,e),t.next=5,(0,g.oq)(r);case 5:t.next=10;break;case 7:t.prev=7,t.t0=t.catch(1),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(e){return t.apply(this,arguments)}}(),r=function(){var r=(0,o.Z)((0,u.Z)().mark((function r(n,a,o){var s;return(0,u.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(a===o){r.next=9;break}return r.next=3,e(o);case 3:return r.next=5,t(n,a);case 5:return s=r.sent,r.abrupt("return",s);case 9:return r.abrupt("return",o);case 10:case"end":return r.stop()}}),r)})));return function(t,e,n){return r.apply(this,arguments)}}();return{setStorage:t,updateStorage:r,deleteStorage:e}}(),Z=h.setStorage,y=h.updateStorage,w=h.deleteStorage,b=(0,c.useState)(null),k=(0,a.Z)(b,2),j=k[0],P=k[1],I=(0,c.useMemo)((function(){return[{updatePost:s,updateStorage:y},{deletePost:p,deleteStorage:w}]}),[]);return(0,c.useEffect)((function(){if("user"===t)1!==j&&P(1);else 0!==j&&P(0)}),[t]),(0,f.jsxs)(f.Fragment,{children:[e&&(0,f.jsx)(d,{setAction:{addPost:n,setStorage:Z}}),null!==j&&0===j&&(0,f.jsx)(l.Z,{action:I}),null!==j&&1===j&&(0,f.jsx)(v.Z,{action:I})]})}}}]);
//# sourceMappingURL=663.7121f171.chunk.js.map