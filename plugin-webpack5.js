 
const path = require('path')
const mixer = require('svg-mixer');
class SvgSpriteLoadByDemand {
  constructor(options){
    this.options = options
  }
  apply(compiler){

    compiler.hooks.compilation.tap('SvgSpriteLoadByDemand',(compilation)=>{
      compilation.hooks.processAssets.tap({
          name: 'SvgSpriteLoadByDemand',
          stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
          // additionalAssets: true,
        },
        (assets) => {
          let fsPath = path.resolve(compiler.options.context, this.options.entryRoot)
          Object.entries(assets).forEach(([pathname, source]) => {

            let content = source.source()
            let appendContent = 'aaaaaaaaaa'
            compilation.assets[pathname] = {
            // 返回文件内容
              source: () => {
                return content + appendContent
              },
              // 返回文件大小
              size: () => {
                return Buffer.byteLength(content + appendContent, 'utf8')
              },
            
            }
              

            /*
            var reg = compiler.options.mode === 'production' ? /"svg-path":(\s?)"(.*?)"/g : /\\"svg-path\\": \\"(.*?)\\"/g
            let content = source.source()
            if(reg.test(content)){
              let svgFiles = content.match(reg) || []
             
              svgFiles = svgFiles.map(item => {
                var pathJson = JSON.parse(`{${item.replace(/\\/g,'')}}`);
                return item = path.resolve(fsPath, pathJson['svg-path'])
              });
              
                
              const result = await mixer(svgFiles)
              // mixer(svgFiles).then(result =>{
                  appendContent = `;(function(){document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend','<div style="display:none">${result.content}</div>')})();`

                  console.log(appendContent)
                
                  compilation.assets[pathname] = {
                  // 返回文件内容
                    source: () => {
                      return content + appendContent
                    },
                    // 返回文件大小
                    size: () => {
                      return Buffer.byteLength(content + appendContent, 'utf8')
                    },
                  }
                // })
            }
            */

          });
        }
      );
    })
    
  }
}


module.exports = SvgSpriteLoadByDemand