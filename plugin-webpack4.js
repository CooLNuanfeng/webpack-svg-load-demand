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
      compilation.hooks.optimizeChunkAssets.tapAsync('SvgSpriteLoadByDemand',
        (chunks, callback) => {
          chunks.forEach(chunk => {

            chunk.files.forEach(file => {
              let content = new ConcatSource(compilation.assets[file]).source();
              let fsPath = path.resolve(compiler.options.context, this.options.entryRoot)
              let spriter = new SVGSpriter({
                mode: {
                  symbol: true
                }
              });
              var reg = /\\"svg-path\\": \\"(.*?)\\"/g
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
                    appendContent = `;(function(){
                      document.getElementById('_svg_sprites_demand_wrap_') && document.getElementById('_svg_sprites_demand_wrap_').remove()
                      document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend','<div style="display:none" id="_svg_sprites_demand_wrap_">${result[mode][resource].contents.toString()}</div>')
                    })();`
                  }
                }
              
                compilation.assets[file] = new ConcatSource(content,appendContent)
                callback()
              });
            });

          });
        }
      );
    })
    
  }
}


module.exports = SvgSpriteLoadByDemand