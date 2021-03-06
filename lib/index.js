var Svgstore = require('svgstore');
const { SourceMapSource } = require('webpack-sources')
const path = require('path')
const fs = require('fs');

class SvgSpriteLoadByDemand {
  constructor(options){
    this.options = options
  }
  apply(compiler){
    compiler.hooks.compilation.tap('SvgSpriteLoadByDemand',(compilation)=>{
      compilation.hooks.afterOptimizeAssets.tap('SvgSpriteLoadByDemand',
        (assets) => {
          let fsPath = path.resolve(compiler.options.context, this.options.entryRoot)
          Object.entries(assets).forEach(([pathname, source]) => {
            var reg = compiler.options.mode === 'production' ? /"svg-path":"(.*?)"/g : /\\"svg-path\\": \\"(.*?)\\"/g
            let sourceAndMap = source.sourceAndMap()
            let content = sourceAndMap.source
            if(reg.test(content)){
              let spriter = Svgstore()
         
              let svgFiles = content.match(reg) || []
              svgFiles.forEach(item => {
                var pathJson = JSON.parse(`{${item.replace(/\\/g,'')}}`);
                let nameReg = /(.*\/)*([^.]+).*/
                let id = pathJson['svg-path'].match(nameReg)[2]
                spriter.add(id, fs.readFileSync(path.resolve(fsPath, pathJson['svg-path']), {encoding: 'utf-8'}),{cleanDefs: true});
              });
          
              let appendContent = `;(function(){document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend','<div style="display:none">${spriter.toString()}</div>')})();\n\n`

              compilation.assets[pathname] = new SourceMapSource(appendContent + content,sourceAndMap.map );
            }
          });
        }
      );
    })
  }
}


module.exports = SvgSpriteLoadByDemand
