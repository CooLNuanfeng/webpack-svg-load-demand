const SVGSpriter = require('svg-sprite'); 
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
                let spriter = new SVGSpriter({
                  mode: {
                    symbol: true
                  }
                });
                
                let svgFiles = content.match(reg) || []
                let appendContent = ''
                svgFiles.forEach(item => {
                  var pathJson = JSON.parse(`{${item.replace(/\\/g,'')}}`);
                  spriter.add(path.resolve(fsPath, pathJson['svg-path']), null, fs.readFileSync(path.resolve(fsPath, pathJson['svg-path']), {encoding: 'utf-8'}));
                });
                // console.log(compilation.assets[file])
                spriter.compile(function(error, result) {
                  if(error) console.log(error)
                  for (var mode in result) {
                    for (var resource in result[mode]) {
                      //document.getElementById('_svg_sprites_demand_wrap_') && document.getElementById('_svg_sprites_demand_wrap_').remove()
                      appendContent = `;(function(){
                        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend','<div style="display:none">${result[mode][resource].contents.toString()}</div>')
                      })();`
                    }
                  }
                
                  compilation.assets[file] = new ConcatSource(content,appendContent)
                  
                });
              }
              
            });

          });
        }
      );
    })
    
  }
}


module.exports = SvgSpriteLoadByDemand