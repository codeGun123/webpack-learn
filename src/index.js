import _ from 'lodash';
// import { Button } from 'antd';
// import './index.css';
// import Icon from './logo-red.png';

import { printMe } from './print.js';
import { cube } from './math.js';
// import './style.css';

function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['Hello', '大炮'], ' ');
  element.classList.add('hello');

  //  添加图片
  // const myIcon = new Image();
  // myIcon.src=Icon;
  //
  // element.appendChild(myIcon);

  //  添加按钮
  var btn = document.createElement('button');
  btn.innerHTML = '点击';
  btn.onclick = printMe;

  element.appendChild(btn);

  console.log(cube(20));

  return element;
}

// document.body.appendChild(component());

let element = component();
document.body.appendChild(element);

// 检测更新，以便webpack接受到并更新模块
if (module.hot) {
  module.hot.accept('./print.js', () => {
    console.log('accepting the updated print module');
    printMe();

    // 更新 btn
    document.body.removeChild(element);
    // 重新渲染元素
    element = component();
    document.body.appendChild(element);
  });
}

// 判断环境
console.log('环境：' + process.env.NODE_ENV); //production, development
// if (process.env.NODE_ENV !== 'production') {
// console.log(process.env.NODE_ENV);
// }
