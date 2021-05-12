const mapSvgJson = {}

module.exports = function(source){
  console.log('=======loader==========')
  const loaderContext = this;

  console.log(this.data)

  return source;
  // return source;
}

module.exports.pitch = function(remainingRequest, precedingRequest, data){
  console.log('===pitch===')
  // data.value = 'aa'
  // console.log(this.resource)
  // console.log(this.query)
  let splitPath = this.query.path + '/'
  let curPathArr = this.resource.split(splitPath)
  let curSvg = curPathArr.length ? curPathArr[1].split('/') : []
  console.log(curSvg)
  // mapSvgJson[curSvg.split('/')
  mapSvgJson[curSvg[0]] ? mapSvgJson[curSvg[0]].push(curSvg[1]) : mapSvgJson[curSvg[0]] = [curSvg[1]]
  console.log('mapSvgJson',mapSvgJson)
  data.value = mapSvgJson
  // console.log('remainingRequest', remainingRequest)
  // console.log('precedingRequest',precedingRequest)
  console.log('===pitch===')
}