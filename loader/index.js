const mixer = require('svg-mixer');
// const SVGSpriter = require('svg-sprite'); 
const path = require('path')
const qs = require('querystring')
const fs = require('fs')

// const mapSvgJson = {}
const catchArr = []

module.exports = function(source, map, meta){
  console.log('=======loader==========')
  var callback = this.async();
  // console.log('resource', this.resource)
  // console.log('resourceQuery', this.resourceQuery)
  
  let resquery =  qs.parse(this.resourceQuery.slice(1))
  let option = this.query;
  var reg = new RegExp(`${option.entry}\\/(\\w+)`);
  let match = this.resource.match(reg)

  const context = this.rootContext || process.cwd()
  const sourceRoot = path.dirname(path.relative(context, this.resourcePath))
  const filename = path.basename(this.resourcePath)
  console.log('context',context);
  console.log('sourceRoot',sourceRoot)
  console.log('filename',filename);

  if(resquery.vue !== undefined 
    && match[1] 
    && !catchArr.includes(match[1])
  ){
    catchArr.push(match[1])
    console.log('match[1]',match[1])
    let fsPath = path.resolve(option.root,option.entry,option.path, match[1])
    let files = fs.readdirSync(fsPath)
    console.log('files', files)
    console.log('fsPath',fsPath)
    // this.addDependency(headerPath);
    var svgFiles = files.map(item => {
      return path.resolve(fsPath, item)
    });
    console.log('svgFiles', svgFiles)
    mixer(svgFiles).then(result => {
      console.log(result.content)
      // return 
      callback(null, result.content, map, meta)
    })

    // return;

    // let spriter = new SVGSpriter({
    //   mode: {
    //     symbol: true
    //   }
    // });
    // //查找文件下的所有svg
    // files.forEach(item => {
    //   if(item){
    //     console.log(path.resolve(fsPath, item))
    //     spriter.add( path.resolve(fsPath, item), null, fs.readFileSync(path.resolve(fsPath, item)), { encoding: 'utf-8' })
        
    //   }
    // })

    // spriter.compile(function(error, result) {
    //   for (var mode in result) {
    //       for (var resource in result[mode]) {
    //           // fs.mkdirSync(path.dirname(result[mode][resource].path), { recursive: true });
    //           // fs.writeFileSync(result[mode][resource].path, result[mode][resource].contents);
    //           console.log('path=>',result[mode][resource].path)
    //           console.log('result=>',result[mode][resource].contents.toString())
    //           // callback(null, '', map, meta)
    //       }
    //   }
    // });


    // return source
    
  }



  // console.log(source)
  // console.log(this.data.value)
  // const loaderContext = this;
  // console.log(loaderContext)
  // const {
  //   target,
  //   request,
  //   minimize,
  //   sourceMap,
  //   rootContext,
  //   resourcePath,
  //   resourceQuery = ''
  // } = loaderContext

  // console.log(target)
  // console.log(request)
  // console.log(minimize)
  // console.log(sourceMap)
  // console.log(rootContext)
  // console.log(this.resourcePath)
  // console.log(this.query)
  // let splitPath = this.query.path + '/'
  // let curPathArr = this.resource.split(splitPath)
  // let curSvg = curPathArr.length ? curPathArr[1].split('/') : []
  // mapSvgJson[curSvg[0]] ? mapSvgJson[curSvg[0]].push(this.resource) : mapSvgJson[curSvg[0]] = [this.resource]

  // console.log(mapSvgJson)
  // var callback = this.async();


  
  
  // let splitPath = this.query.path + '/'
  // let curPathArr = this.resource.split(splitPath)
  // // console.log(curPathArr)
  // let result = {
  //   path: this.resourcePath,
  //   key: curPathArr[1].split('/')[0],
  //   name: curPathArr[1].split('/')[1],
  //   subPath: curPathArr[1]
  // }
  // console.log(result)
  // let splitPath = this.query.path + '/'
  // let curPathArr = this.resource.split(splitPath)
  // let curSvg = curPathArr.length ? curPathArr[1].split('/') : []
  // console.log(curSvg)
  // mapSvgJson[curSvg[0]] ? mapSvgJson[curSvg[0]].push(this.resource) : mapSvgJson[curSvg[0]] = [this.resource]

  // return `require("${result.path}?path=${result.key}")`

  // for(let key in mapSvgJson){
  //   let spriter = new SVGSpriter({
  //     // dest: path.resolve(process.cwd(),output),
  //     mode: {
  //       symbol: true
  //     }
  //   });
  //   mapSvgJson[key].forEach(path => {
  //     spriter.add(path, null, )
  //   });
  //   result[key] =  spriter
  // }

  // spriter.add(this.resourcePath, null, source)

  // spriter.compile(function(error, result) {
  //   /* Write `result` files to disk (or do whatever with them ...) */
  //     for (var mode in result) {
  //         for (var resource in result[mode]) {
  //             // fs.mkdirSync(path.dirname(result[mode][resource].path), { recursive: true });
  //             // fs.writeFileSync(result[mode][resource].path, result[mode][resource].contents);
  //             console.log('path=>',result[mode][resource].path)
  //             console.log('result=>',result[mode][resource].contents.toString())
  //             callback(null, '', map, meta)
  //         }
  //     }
  // });

  // let json = {}
  // for(let key in mapSvgJson){
  //   mapSvgJson[key].forEach(item => {
  //     spriter.add(
  //         path.resolve(path.join(item)), // path.resolve('src/close.svg')
  //         null,
  //         fs.readFileSync(path.resolve(process.cwd(),item), { encoding: 'utf-8' })
  //     );
  //   })
  // }
  return source;
}

module.exports.pitch = function(remainingRequest, precedingRequest, data){

  

  // console.log('===pitch===')
  // console.log('remainingRequest',remainingRequest)
  // console.log(this.loaders)
  // console.log('====pitch====')
  // console.log(this.loaderIndex)
  // data.value = 'aa'
  
  // console.log('query',this.query)
  // let json = {}
  // let splitPath = this.query.path + '/'
  // let curPathArr = this.resource.split(splitPath)
  // let curSvg = curPathArr.length ? curPathArr[1].split('/') : []
  // console.log(curSvg)
  // // mapSvgJson[curSvg.split('/')
  // mapSvgJson[curSvg[0]] ? mapSvgJson[curSvg[0]].push(this.resource) : mapSvgJson[curSvg[0]] = [this.resource]
  // console.log('mapSvgJson',mapSvgJson)
  // data.value = mapSvgJson
  // console.log('remainingRequest', remainingRequest)
  // console.log('precedingRequest',precedingRequest)
  // for(let key in mapSvgJson){
  //   // console.log(mapSvgJson[key])
  //   mixer(mapSvgJson[key]).then(result => {
  //     json[key] = result.content
  //     // console.log(json)
  //     data.value = json
  //   })
  // }
  

  // console.log('===pitch===')
  // return `module.exports = require("-!${this.resource}")`
}


function myReadfile(MyUrl) {
  fs.readdir(MyUrl, (err, files) => {
      if (err) throw err
      files.forEach(file => {
          //拼接获取绝对路径，fs.stat(绝对路径,回调函数)
          let fPath = path.join(MyUrl, file);
          fs.stat(fPath, (err, stat) => {
              if (stat.isFile()) {
                  //stat 状态中有两个函数一个是stat中有isFile ,isisDirectory等函数进行判断是文件还是文件夹
                  console.log(file)
              }
              else {
                  myReadfile(fPath)
              }
          })
      })
  })
}