import md5 from 'js-md5'
export default {
  appSign (params) {
    // 应用公钥
    var clientId = 'SWQxcGJxM2RrRkoyOTAxNGU'
    // 应用私钥 当做token 参与加密
    var appKey = 'SXT'
    var timestamp = parseInt(new Date().getTime() / 1000)
    // 公钥加入参数中
    params.client_id = clientId
    // 时间戳添加到参数中
    params.timestamp = timestamp
    // 获取key值
    var keys = []
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        keys.push(key)
      }
    }
    // 对key值按照字段顺序排序
    keys.sort()
    var values = []
    for (var i = 0; i < keys.length; i++) {
      var value = encodeURIComponent(params[keys[i]])
      values.push(keys[i] + '=' + value)
    }
    var signStr = values.join('&') + appKey
    console.log('=======signStr=======' + signStr)
    var sign = md5(signStr)
    return sign
  }
}
