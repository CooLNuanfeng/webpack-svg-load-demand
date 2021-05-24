
// const fs = require('fs')
// const path = require('path')

class SvgSpriteLoadByDemand {
  constructor(options){
    this.options = options
  }
  apply(compiler){

    // compiler.hooks.thisCompilation.tap('svgSpritePlugin', (compilation)=>{
    //   compilation.hooks.processAssets.tap('assets',(assets)=>{
    //     console.log(assets)
    //   })
    // })

    // compiler.hooks.watchRun.tapAsync('svgSpritePlugin',(compiler, callback)=>{
    //   // optimization:
    //   console.log(compiler.module)
    // })
    // compiler.hooks.run.tap('run', () => {
    //   console.log('开始编译...')
    // })

    // compiler.hooks.compile.tap('compile', () => {
    //   console.log('===> compile')
    // })

    // compiler.hooks.done.tap('compilation', () => {
    //   console.log('===> compilation')
    // })
  }
}

// console.log('file==>',findAllDir(path.resolve("./test/assets/")))

// function findAllDir(filePath) {
//   const stack = [filePath];
//   console.log('stack',stack)
//   const res = [];
//   while (stack.length > 0) {
//     const _path = stack.shift();
//     const files = fs.readdirSync(_path);
//     files.forEach(function(filename) {
//       const _filePath = path.join(_path, filename);
//       const stats = fs.statSync(_filePath);
//       if (stats.isDirectory()) {
//         stack.unshift(_filePath);
//       } else if (stats.isFile() && isSvg(_filePath)) {
//         res.push(_path);
//       }
//     });
//   }
//   return res.slice(1);
// }

// function isSvg(filePath) {
//   return /svg/g.test(path.extname(filePath));
// }


module.exports = SvgSpriteLoadByDemand