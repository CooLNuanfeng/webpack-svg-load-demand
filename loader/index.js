// const mixer = require('svg-mixer');
const mapSvgJson = {}

module.exports = function(source,map, meta){
  console.log('=======loader==========')
  // const loaderContext = this;
  // var callback = this.async();
  // let filePath = loaderContext.resourcePath.split(loaderContext.query.path)[0]
  // console.log(filePath)
  // console.log(mapSvgJson)
  // let json = {}
  // console.log(loaderContext.resourcePath)
  // callback(null, `module.exports = ${JSON.stringify(json)}`, map, meta);

  // return `module.exports = ${JSON.stringify(mapSvgJson)}`
  return source
  
}

module.exports.pitch = function(remainingRequest, precedingRequest, data){
  console.log('===pitch===')
  // data.value = 'aa'
  // console.log(this.resource)
  // console.log(this.query)
  // let splitPath = this.query.path + '/'
  // let curPathArr = this.resource.split(splitPath)
  // let curSvg = curPathArr.length ? curPathArr[1].split('/') : []
  // // console.log(curSvg)
  // // mapSvgJson[curSvg.split('/')
  // mapSvgJson[curSvg[0]] ? mapSvgJson[curSvg[0]].push(this.resource) : mapSvgJson[curSvg[0]] = [this.resource]
  // // console.log('mapSvgJson',mapSvgJson)
  // data.value = mapSvgJson
  // console.log('remainingRequest', remainingRequest)
  // console.log('precedingRequest',precedingRequest)
  // console.log('===pitch===')
  
}