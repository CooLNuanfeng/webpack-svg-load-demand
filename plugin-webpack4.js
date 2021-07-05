const ConcatSource = require('webpack-sources').ConcatSource
const path = require('path')
const mixer = require('svg-mixer');

class SvgSpriteLoadByDemand {
  constructor(options){
    this.options = options
  }
  apply(compiler){
    compiler.hooks.compilation.tap('SvgSpriteLoadByDemand',(compilation)=>{
      compilation.hooks.afterOptimizeChunkAssets.tap('SvgSpriteLoadByDemand',
        (chunks) => {
          chunks.forEach(chunk => {
            chunk.files.forEach(async file => {
              let content = new ConcatSource(compilation.assets[file]).source();
              var reg = compiler.options.mode === 'production' ? /"svg-path":"(.*?)"/g : /\\"svg-path\\": \\"(.*?)\\"/g
              if(reg.test(content)){
                let fsPath = path.resolve(compiler.options.context, this.options.entryRoot)  
                
                let svgFiles = content.match(reg) || []
                svgFiles = svgFiles.map(item => {
                  var pathJson = JSON.parse(`{${item.replace(/\\/g,'')}}`);
                  return item = path.resolve(fsPath, pathJson['svg-path'])
                  
                });
                let appendContent = ''
                console.log(111111)
                const result = await mixer(svgFiles)
                console.log(2222222)
                appendContent = `;(function(){document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend','<div style="display:none">${result.content}</div>')})();`;
                console.log(appendContent)
                compilation.assets[file] = new ConcatSource(
                  content,
                  appendContent,
                );
                
              }
            });
          });

        }
      );

    })
    
  }
}


module.exports = SvgSpriteLoadByDemand