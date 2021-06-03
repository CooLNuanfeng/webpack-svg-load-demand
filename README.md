## webpack-svg-sprite-load-demand

English | [简体中文](./README_CN.md)

This is a webpack plug-in that generates svg sprite on demand. It is currently in the trial stage of vue and supports webpack 4 and 5. Please refer to the test directory for usage.

#### Install

  ```
    npm i webpack-svg-sprite-load-demand -D
  ```

#### Usage

- entryRoot 

  Project entry root directory

  ```
    new WebpackSvgLoadDemand({
      entryRoot: './test'}
    ),
  ```


#### Example

  Take vue.config.js in vue cli as an example


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

  global SFC svg-icon

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