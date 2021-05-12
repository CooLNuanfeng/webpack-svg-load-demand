import Vue from 'vue'
import SvgIcon from './svg.vue'

Vue.component('svg-icon', SvgIcon)

// 遍历require.context的返回模块，并导入
const ctx = require.context("../../assets", true, /\.svg$/);
console.log(ctx.keys(),'keys')
ctx.keys().forEach(path => {
  console.log('path',path)
  const temp = path.split('/');
  const level = temp.length
  console.log('temp',temp)
  if (!temp) return;
  const name = temp[level-1];
  const page = temp[level-2]
  console.log(name)
  require(`../../assets/${page}/${name}`);
});