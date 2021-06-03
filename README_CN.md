## webpack-svg-sprite-load-demand

[English](./README_CN.md) | 简体中文

这个是一个按需生成svg sprite的webpack插件，目前处在vue试用阶段，支持webpack4、5，使用方式参考test目录


#### 安装

  ```
    npm i webpack-svg-sprite-load-demand -D
  ```

#### 使用

- entryRoot 

  项目入口的根目录

  ```
    new WebpackSvgLoadDemand({
      entryRoot: './test'}
    ),
  ```


#### 实例

  以 vue cli 里 vue.config.js为例

  vue.config.js

  ```
    const WebpackSvgLoadDemand = require('webpack-svg-sprite-load-demand');
    module.exports = {
      configureWebpack: config => {
         config.plugins = [
          ...config.plugins,
          new WebpackSvgLoadDemand({
            entryRoot: './src'
          }),
        ]
      }
    }
  ```

  全局svg-icon组件

  ```
    <template functional>
      <svg aria-hidden="true">
        <use :xlink:href="`#${props.xlink}`"/>
      </svg>
    </template>
  ```

  template

  ```
    <svg-icon class="svg-icon" svg-path="assets/svgs/test/safe.svg" xlink="safe"></svg-icon>
  ```



