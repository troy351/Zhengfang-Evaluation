###背景
最近登录教务管理系统发现又要进行教学质量评价了，于是乎闲来无事写了个能批量评价的脚本，理论上应该支持所有“正方教务管理系统”。
###使用方法
* 首先你需要一个现代浏览器 Chrome， Safari， Firefox 均可（或大部分国产浏览器的急速/高速模式，即需要有*审查元素*功能，以Chrome为例，暂未测试IE9+）
* 登录教务管理系统，点击进入教学质量评价，选中*第一门*需要评价的课程，即如下图界面
![评价第一门课](https://raw.githubusercontent.com/troy351/Zhengfang-Evaluation/master/images/first_course.jpg)
* 网页空白处右键选择审查元素(Inspect Element)，切换到控制台(Console)
![控制台](https://raw.githubusercontent.com/troy351/Zhengfang-Evaluation/master/images/console.jpg)
* 复制如下代码

```javascript
var script = document.createElement("script");
script.type = "text/javascript";
script.src = 'https://cdn.rawgit.com/troy351/Zhengfang-Evaluation/master/script.min.js';
document.getElementsByTagName("head")[0].appendChild(script);
```

* 粘贴到控制台，回车运行（为了适应网页刷新延迟，每提交一门课会等待1s后继续提交下一门课）
![粘贴脚本并运行](https://raw.githubusercontent.com/troy351/Zhengfang-Evaluation/master/images/script.jpg)
* 等待一会儿会提示你评价完成，然后点一下“提交”就好啦

### 说明
由于教务管理系统限制一门课的所有评价不能完全相同，于是此脚本采用所有均评价“优秀”，随机一项评价“合格”的策略，觉得不合适请不要使用此脚本

