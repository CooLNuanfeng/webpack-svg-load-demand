var Svgstore = require('svgstore');
const ConcatSource = require('webpack-sources').ConcatSource
const path = require('path')
const fs = require('fs');

class SvgSpriteLoadByDemand {
  constructor(options){
    this.options = options
  }
  apply(compiler){
    compiler.hooks.compilation.tap('SvgSpriteLoadByDemand',(compilation)=>{
      compilation.hooks.afterOptimizeChunkAssets.tap('SvgSpriteLoadByDemand',
        (chunks) => {
          chunks.forEach(chunk => {
            chunk.files.forEach(file => {
              let content = new ConcatSource(compilation.assets[file]).source();
              var reg = compiler.options.mode === 'production' ? /"svg-path":"(.*?)"/g : /\\"svg-path\\": \\"(.*?)\\"/g
              if(reg.test(content)){
                let fsPath = path.resolve(compiler.options.context, this.options.entryRoot)
                let spriter = Svgstore();
                let svgFiles = content.match(reg) || []
                
                svgFiles.forEach(item => {
                  var pathJson = JSON.parse(`{${item.replace(/\\/g,'')}}`);
                  let nameReg = /(.*\/)*([^.]+).*/
                  let id = pathJson['svg-path'].match(nameReg)[2]
                  spriter.add(id, fs.readFileSync(path.resolve(fsPath, pathJson['svg-path']), {encoding: 'utf-8'}),{cleanDefs: true});
                });
                // console.log(compilation.assets[file])
                let appendContent = `;(function(){document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend','<div style="display:none">${spriter.toString()}</div>')})();`
                
                compilation.assets[file] = new ConcatSource(appendContent,content)
              }
              
            });

          });
        }
      );
    })
    
  }
}


module.exports = SvgSpriteLoadByDemand
