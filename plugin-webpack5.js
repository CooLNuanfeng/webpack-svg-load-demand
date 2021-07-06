 
const path = require('path')
const mixer = require('svg-mixer');
class SvgSpriteLoadByDemand {
  constructor(options){
    this.options = options
  }
  apply(compiler){

    compiler.hooks.compilation.tap('SvgSpriteLoadByDemand',(compilation)=>{
      compilation.hooks.processAssets.tapAsync({
          name: 'SvgSpriteLoadByDemand',
          stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
          additionalAssets: true
        },
        (assets, callback) => {
          let fsPath = path.resolve(compiler.options.context, this.options.entryRoot)
          Object.entries(assets).forEach(([pathname, source]) => {
            var reg = compiler.options.mode === 'production' ? /"svg-path":(\s?)"(.*?)"/g : /\\"svg-path\\": \\"(.*?)\\"/g
            let content = source.source()
            if(reg.test(content)){
              let svgFiles = content.match(reg) || []
              svgFiles = svgFiles.map(item => {
                var pathJson = JSON.parse(`{${item.replace(/\\/g,'')}}`);
                return item = path.resolve(fsPath, pathJson['svg-path'])
              });
              
              let appendContent = ''
              mixer(svgFiles).then(result =>{
                appendContent = `;(function(){document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend','<div style="display:none">${result.content}</div>')})();`

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
                callback()
              })
              
            }
          })
        }
      );
    })
    
  }
}


module.exports = SvgSpriteLoadByDemand