const SVGSpriter = require('svg-sprite'); 
const path = require('path')
const fs = require('fs');

class SvgSpriteLoadByDemand {
  constructor(options){
    this.options = options
  }
  apply(compiler){

    compiler.hooks.compilation.tap('SvgSpriteLoadByDemand',(compilation)=>{
      compilation.hooks.processAssets.tap({
          name: 'SvgSpriteLoadByDemand',
          stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (assets) => {

          let fsPath = path.resolve(compiler.options.context, this.options.entryRoot)
          Object.entries(assets).forEach(([pathname, source]) => {
            // console.log(pathname)
            let content = source.source()
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
            });
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
          });
        }
      );
    })
    
  }
}


module.exports = SvgSpriteLoadByDemand