// 时间格式化
/**
 * 时间戳转换日期
 * @param <int> unixTime    待时间戳(秒)
 * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)
 * @param <int>  timeZone   时区
 */
export const formatDate = (unixTime, isFull, timeZone) => {
  if (typeof (timeZone) === 'number') {
    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60
  }
  var time = new Date(unixTime * 1000)
  var ymdhis = ''
  ymdhis += time.getFullYear() + '-'
  ymdhis += (time.getMonth() + 1) + '-'
  ymdhis += time.getDate()
  if (isFull === true) {
    ymdhis += ' ' + time.getHours() + ':'
    ymdhis += time.getMinutes() + ':'
    ymdhis += time.getSeconds()
  }
  return ymdhis
}
// 金额格式化
export const numberFormat = (number, decimals, decPoint, thousandsSep, roundtag) => {
  /*
  * 参数说明：
  * number：要格式化的数字
  * decimals：保留几位小数
  * decPoint：小数点符号
  * thousandsSep：千分位符号
  * roundtag:舍入参数，默认 'ceil' 向上取,'floor'向下取,'round' 四舍五入
  * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  roundtag = roundtag || 'round' // 'ceil','floor','round'
  var n = !isFinite(+number) ? 0 : +number
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
  var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
  var s = ''
  var toFixedFix = function (n, prec) {
    var k = Math.pow(10, prec)
    return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  var re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}
