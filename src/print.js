import _ from 'lodash';

export function printMe() {
  console.log('来自print文件。。。', _.join(['测试', 'code', '分离。。。']));
}

export function say() {
  console.log('大炮。。。');
}
