const ConcatSource = require('webpack-sources').ConcatSource
const path = require('path')
const mixer = require('svg-mixer');

class SvgSpriteLoadByDemand {
  constructor(options){
    this.options = options
  }
  apply(compiler){
    compiler.hooks.compilation.tap('SvgSpriteLoadByDemand',(compilation)=>{
      compilation.hooks.optimizeChunkAssets.tapAsync('SvgSpriteLoadByDemand',
        (chunks,callback) => {
          chunks.forEach(chunk => {
            chunk.files.forEach(file => {
              let content = new ConcatSource(compilation.assets[file]).source();
              var reg = compiler.options.mode === 'production' ? /"svg-path":(\s?)"(.*?)"/g : /\\"svg-path\\": \\"(.*?)\\"/g
              if(reg.test(content)){
                let fsPath = path.resolve(compiler.options.context, this.options.entryRoot)  
                
                let svgFiles = content.match(reg) || []
                svgFiles = svgFiles.map(item => {
                  var pathJson = JSON.parse(`{${item.replace(/\\/g,'')}}`);
                  return item = path.resolve(fsPath, pathJson['svg-path'])
                  
                });
                let appendContent = ''
                mixer(svgFiles).then(result => {
                  appendContent = `;(function(){document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend','<div style="display:none">${result.content}</div>')})();`;
                  compilation.assets[file] = new ConcatSource(
                    content,
                    appendContent,
                  );
                  callback()
                })
                
              }
            });
          });

        }
      );

    })
    
  }
}


module.exports = SvgSpriteLoadByDemand