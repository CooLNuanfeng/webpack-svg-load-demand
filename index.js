const SVGSpriter = require('svg-sprite'); 
const path = require('path')
class SvgSpriteLoadByDemand {
  constructor(options){
    this.options = options
  }
  apply(compiler){

    // compiler.hooks.normalModuleFactory.tap('SvgSpriteLoadByDemand', (factory) => {
    //   factory.hooks.parser.for('javascript/auto').tap('SvgSpriteLoadByDemand', (parser, options) => {
    //     // console.log(parser)
    //       parser.hooks.evaluate.for('CallExpression').tap('SvgSpriteLoadByDemand',(expression)=>{
    //         console.log('expression',expression)
    //       });
    //     });
    // });

    compiler.hooks.compilation.tap('SvgSpriteLoadByDemand',(compilation)=>{
      compilation.hooks.processAssets.tap({
          name: 'SvgSpriteLoadByDemand',
          stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONS, // see below for more stages
        },
        (assets) => {
          Object.entries(assets).forEach(([pathname, source]) => {
            console.log(pathname)
            let content = source.source() // 欲处理的文本
            let spriter = new SVGSpriter({
              mode: {
                symbol: true
              }
            });
            var reg = /\\"svg-path\\": \\"(.*?)\\"/g
            console.log(content.match(reg));

            files.forEach(item => {
              // this.addDependency(path.resolve(fsPath, item));
              console.log(path.resolve(fsPath, item))

              spriter.add(path.resolve(fsPath, item), null, fs.readFileSync(path.resolve(fsPath, item), {encoding: 'utf-8'}));
            });
        
            // console.log(`— ${pathname}: ${source.size()} bytes`);
          });
        }
      );
    })
    


    // compiler.hooks.compilation.tap('SvgSpriteLoadByDemand',(compilation,{moduleAsset})=>{
    //   console.log('moduleAsset', moduleAsset)
    // })

    // compiler.hooks.make.tapAsync("SvgSpriteLoadByDemand", (compilation, callback) => {
    //     // const { entry, name, context } = this;
    //     // const dep = SingleEntryPlugin.createDependency(entry, name);
    //     // compilation.addEntry(context, dep, name, callback);
    //     callback()
    //   }
    // );


    // compiler.hooks.entryOption.tap('SvgSpriteLoadByDemand',(entry) => {
    //   console.log('entry=>', entry)
    // })
    // compiler.hooks.afterPlugins.tap('SvgSpriteLoadByDemand',(compiler)=>{
    //   console.log('afterPlugins')
    // })
    // compiler.hooks.afterResolvers.tap('SvgSpriteLoadByDemand',(compiler)=>{
    //   console.log('afterResolvers')
    // })

    // compiler.hooks.beforeRun.tapAsync('SvgSpriteLoadByDemand', (compilation, callback)=>{
    //   console.log('beforeRun')
    //   callback()
    // })

    // compiler.hooks.run.tapAsync('SvgSpriteLoadByDemand', (compilation, callback)=>{
    //   console.log('run')
    //   callback()
    // })
    
    // compiler.hooks.watchRun.tapAsync('SvgSpriteLoadByDemand', (compilation,callback)=>{
    //   console.log('watchRun')
    //   callback()
    // })

    // compiler.hooks.contextModuleFactory.tap('SvgSpriteLoadByDemand',(contextModuleFactory)=>{
    //   console.log('contextModuleFactory')
    //   contextModuleFactory.hooks.beforeResolve.tapAsync('SvgSpriteLoadByDemand',(data,callback)=>{
    //     callback()
    //   })
    //   contextModuleFactory.hooks.afterResolve.tapAsync('SvgSpriteLoadByDemand',(data,callback)=>{
    //     // console.log('data=>',data)
    //     callback()
    //   })
    //   contextModuleFactory.hooks.contextModuleFiles.tap('SvgSpriteLoadByDemand',(filename)=>{
    //     // console.log('filename=>',filename)
    //   })
    //   contextModuleFactory.hooks.alternativeRequests.tapAsync('SvgSpriteLoadByDemand',(request,options, callback)=>{
    //     // console.log('request=>',request[0])
        
    //     // console.log('options=>', options)
    //     callback()
    //   })
    // })


    // compiler.hooks.normalModuleFactory.tap('SvgSpriteLoadByDemand',(normalModuleFactory)=>{
    //   console.log('normalModuleFactory')
    //   normalModuleFactory.hooks.beforeResolve.tapAsync('SvgSpriteLoadByDemand',(ResolveData,callback)=>{
    //     console.log('beforeResolve')
    //     callback()
    //   })
      // normalModuleFactory.hooks.parser
      // .for('javascript/auto')
      // .tap('SvgSpriteLoadByDemand', (parser, options) => {
      //   parser.hooks.import.tap('SvgSpriteLoadByDemand',(statement,source)=>{
      //     console.log('import=>',statement)
      //   });
      // });

    // })


    // compiler.hooks.compilation.tap('SvgSpriteLoadByDemand',(compilation)=>{
    //   console.log('compilation');
    //   compilation.hooks.moduleAsset.tap('SvgSpriteLoadByDemand',(module, filename)=>{
    //     console.log('moduleAsset')
    //   })
    // })

    // compiler.hooks.compilation.tap('SvgSpriteLoadByDemand',(compilation)=>{
    //   console.log('compilation');
    //   compilation.hooks.buildModule.tap('SvgSpriteLoadByDemand',(module)=>{
    //     console.log('buildModule')
    //   })

    //   compilation.hooks.normalModuleLoader.tap('SvgSpriteLoadByDemand',(loaderContext,module)=>{
    //     console.log('normalModuleLoader')
    //     console.log('normalModuleLoader')
    //   })
    // })
    
    // compiler.hooks.emit.tapAsync('SvgSpriteLoadByDemand', function (compilation, callback) {
    //   console.log('emit')


      // compilation.chunks 存放所有代码块，是一个数组
      // compilation.chunks.forEach(function (chunk) {
      //   // console.log(chunk.files)
      //   chunk.files.forEach(function (filename) {
      //     // compilation.assets 存放当前所有即将输出的资源
      //     // 调用一个输出资源的 source() 方法能获取到输出资源的内容
      //     let source = compilation.assets[filename].source();
      //     // console.log(source)
      //   });
        // chunk 代表一个代码块
        // 代码块由多个模块组成，通过 chunk.forEachModule 能读取组成代码块的每个模块
        // chunk.forEachModule(function (module) {
        //   console.log(module)
          // module 代表一个模块
          // module.fileDependencies 存放当前模块的所有依赖的文件路径，是一个数组
          // module.fileDependencies.forEach(function (filepath) {
        // });
      // });

    //     // Webpack 会根据 Chunk 去生成输出的文件资源，每个 Chunk 都对应一个及其以上的输出文件
    //     // 例如在 Chunk 中包含了 CSS 模块并且使用了 ExtractTextPlugin 时，
    //     // 该 Chunk 就会生成 .js 和 .css 两个文件
        // chunk.files.forEach(function (filename) {
        //   // compilation.assets 存放当前所有即将输出的资源
        //   // 调用一个输出资源的 source() 方法能获取到输出资源的内容
        //   let source = compilation.assets[filename].source();
        // });
      // });

    //   // 这是一个异步事件，要记得调用 callback 通知 Webpack 本次事件监听处理结束。
    //   // 如果忘记了调用 callback，Webpack 将一直卡在这里而不会往后执行。
    //   callback();
    // })
  }
}


module.exports = SvgSpriteLoadByDemand