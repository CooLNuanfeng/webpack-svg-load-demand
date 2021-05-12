

module.exports = function(source){
  console.log('=======loader==========')
  const loaderContext = this;

  // console.log(this.data)

  return source;
  // return source;
}

module.exports.pitch = function(remainingRequest, precedingRequest, data){
  console.log('===pitch===')
  // data.value = 'aa'
  console.log(this.request)
  console.log(this.resource)
  console.log(this.options)
  console.log('remainingRequest', remainingRequest)
  console.log('precedingRequest',precedingRequest)
  console.log('===pitch===')
}