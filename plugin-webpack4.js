const ConcatSource = require('webpack-sources').ConcatSource
const path = require('path')
const mixer = require('svg-mixer');

class SvgSpriteLoadByDemand {
  constructor(options){
    this.options = options
  }
  apply(compiler){

    compiler.hooks.compilation.tap('SvgSpriteLoadByDemand',(compilation)=>{
      compilation.hooks.additionalAssets.tapAsync('SvgSpriteLoadByDemand',callback => {


        // Object.keys(compilation.assets).forEach(file=>{
        //   if(file.includes('.js')){
        //     let appendContent = ';(function(){console.log(2222)})();'
        //     compilation.assets[file] = new ConcatSource(
        //       appendContent,
        //       compilation.assets[file]
        //     );
        //   }
        // })

        // callback();


        Object.keys(compilation.assets).forEach(async file=>{
          if(file.includes('.js')){
            let content = compilation.assets[file].source()
            var reg = compiler.options.mode === 'production' ? /"svg-path":(\s*)"(.*?)"/g : /\\"svg-path\\": \\"(.*?)\\"/g
    
            if(reg.test(content)){
              let fsPath = path.resolve(compiler.options.context, this.options.entryRoot)  
              
              let svgFiles = content.match(reg) || []
              svgFiles = svgFiles.map(item => {
                var pathJson = JSON.parse(`{${item.replace(/\\/g,'')}}`);
                return item = path.resolve(fsPath, pathJson['svg-path'])
              });
  
              const result = await mixer(svgFiles)
              let appendContent = `;(function(){document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<div style="display:none">${result.content}</div>')})();`;
              console.log(result.content)
              compilation.assets[file] = {
                // 返回文件内容
                source: () => {
                  return content + appendContent
                },
                // 返回文件大小
                size: () => {
                  return Buffer.byteLength(content + appendContent, 'utf8')
                },
              }
              callback()
            }
          }
        })

        callback()

      })
    });


    // compiler.hooks.compilation.tap('SvgSpriteLoadByDemand',(compilation)=>{
    //   compilation.hooks.optimizeChunkAssets.tapAsync('SvgSpriteLoadByDemand',
    //     (chunks,callback) => {
          // chunks.forEach(chunk => {
          //   chunk.files.forEach(file => {
          //     let content = compilation.assets[file].source()
          //     var reg = compiler.options.mode === 'production' ? /"svg-path":(\s*)"(.*?)"/g : /\\"svg-path\\": \\"(.*?)\\"/g
          //     if(reg.test(content)){
          //       let fsPath = path.resolve(compiler.options.context, this.options.entryRoot)  
                
          //       let svgFiles = content.match(reg) || []
          //       svgFiles = svgFiles.map(item => {
          //         var pathJson = JSON.parse(`{${item.replace(/\\/g,'')}}`);
          //         return item = path.resolve(fsPath, pathJson['svg-path'])
          //       });

          //       let appendContent = ''
          //       mixer(svgFiles).then(result => {
          //         appendContent += `;(function(){document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<div style="display:none">${result.content}</div>')})();`;
          //         compilation.assets[file] = {
          //           // 返回文件内容
          //           source: () => {
          //             return content + appendContent
          //           },
          //           // 返回文件大小
          //           size: () => {
          //             return Buffer.byteLength(content + appendContent, 'utf8')
          //           },
          //         }
          //         callback()
          //       })
          //     }else{
          //       compilation.assets[file] = new ConcatSource(content);
          //       callback()
          //     }
          //   });
          // });



          // let appendContent = ';(function(){console.log(111)})();'
          // chunks.forEach(chunk => {
          //   chunk.files.forEach(file => {
          //     if(file.includes('.js')){
          //       compilation.assets[file] = new ConcatSource(
          //         appendContent,
          //         compilation.assets[file]
          //       );
          //     }
             
          //   });
          // });
      
          // callback();

    //     }
    //   );

    // })
    
  }
}


module.exports = SvgSpriteLoadByDemand