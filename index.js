class SvgSpriteLoadByDemand {
  constructor(options){
    this.options = options
  }
  apply(compiler){
    compiler.hooks.assetEmitted.tap("svgSprite",(file, { content, source, outputPath, compilation, targetPath }) => {
      console.log('svgsrpite ==> end')
      // console.log(content);
      // console.log(content.toString()); 
    });
  }
}


module.exports = SvgSpriteLoadByDemand