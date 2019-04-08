// Vue Mixin
export default {
  methods: {
    /**
     * 校验字符串
     */
    validString,
    validDate,
    validEmail,
    validatePhone,
    validPhone,
    validateMobilePhone,
    validMobilePhone,
    validNumber,
    validateDecimal,
    validDecimal,
    validDemo,
    validateInt,
    validInt,
    validateMustIncludeChinese,
    validMustIncludeChinese,
    validateCannotIncludeChinese,
    validCannotIncludeChinese,
    validIdCardNo,
    validateIdCardNo,
    validatePostalCode,
    validPostalCode
  }
}
/**
 * @description 格式化金额
 * @param number：要格式化的数字
 * @param decimals：保留几位小数 默认0位
 */
export const formatDecimal = (number, decimals = 0) => {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  let n = !isFinite(+number) ? 0 : +number
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  let s = ''
  let toFixedFix = function (n, prec) {
    let k = Math.pow(10, prec)
    return '' + Math.ceil(n * k) / k
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  let re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1,$2')
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join('.')
}
/**
 * 校验字符串规则生成方法
 * @param i最小长度
 * @param m最大长度
 */
export function validString (i, m) {
  let mge = '警告：输入内容必须为'
  if (i !== undefined) {
    mge = mge + '长度大于' + i
  }
  if (m !== undefined) {
    mge = mge + '长度小于' + m
  }
  mge = mge + '字符串！'
  let rule = {}
  if (i !== undefined && m !== undefined) {
    rule = { type: 'number', min: i, max: m, message: mge }
  } else if (i === undefined && m !== undefined) {
    rule = { type: 'number', max: m, message: mge }
  } else if (i !== undefined && m === undefined) {
    rule = { type: 'number', min: i, message: mge }
  } else {
    rule = { type: 'number', message: mge }
  }
  return rule
}
/**
 * 案例
 * @param i最小长度
 * @param m最大长度
 */
export function validDemo (i, m) {
  let requiredRules = [
    { required: true, message: '输入值不能为空', trigger: 'blur' }
  ]
  let formRules = [
    { min: i, max: m, message: '长度在' + i + ' 到 ' + m + ' 个字符' }
  ]
  return [].concat(formRules).concat(requiredRules)
}
/**
 * 校验日期规则生成方法
 *
 */
export function validDate () {
  let formRules = { type: 'date', message: '警告：请选择日期！' }

  return formRules
}
/**
 * 校验邮箱规则生成方法
 */
export function validEmail () {
  let formRules = { type: 'email', message: '警告：请输入正确的邮箱地址' }

  return formRules
}
export function validatePhone (rule, value, callback) {
  if (value !== '') {
    var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
    if (!reg.test(value)) {
      callback(new Error('警告：请输入正确的手机号或者座机号格式为：0000-0000000'))
    }
  }
  callback()
}
export function validPhone () {
  let formRules = { validator: (rule, value, callback) => { validatePhone(rule, value, callback) }, trigger: 'blur' }

  return formRules
}
/**
 * 校验手机号规则callback方法
 */
export function validateMobilePhone (rule, value, callback) {
  if (value !== '') {
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/
    // 如果为1开头则验证手机号码
    if (value.substring(0, 1) !== '1') {
      callback(new Error('请正确填写手机号码,第一个字符必须是【1】'))
    }
    if (!reg.exec(value) && value.length !== 11) {
      callback(new Error('警告：请输入有效的11位手机号码 例如:13511111111！'))
    }
  }
  callback()
}
/**
 * 校验手机号规则生成方法
 */
export function validMobilePhone () {
  let formRules = { validator: (rule, value, callback) => { validateMobilePhone(rule, value, callback) }, trigger: 'blur' }

  return formRules
}
/**
 * 校验浮点数据类型callback方法
 */
export function validateDecimal (rule, value, callback) {
  let valueStr = value.toString()
  let nubvalue = valueStr.replace(/-/g, '')
  nubvalue = nubvalue.replace('+', '')
  nubvalue = nubvalue.replace(',', '')
  if (valueStr.split('-').length > 2 || valueStr.split('+').length > 2 || valueStr.split('.').length > 2) {
    callback(new Error('警告：请输入正确的数字,不能包含多个【+，- ，•】符号！'))
  }
  if ((valueStr.indexOf('-') !== -1 || valueStr.indexOf('+') !== -1) && nubvalue === '') {
    callback(new Error('警告：请输入正确的数字,不能仅包含【+，-】符号！'))
  }
  if ((valueStr.indexOf('-') !== -1 || valueStr.indexOf('+') !== -1) && nubvalue !== '') {
    let firstChar = valueStr.substring(0, 1)
    if (firstChar !== '-' && firstChar !== '+') {
      callback(new Error('警告：如果数字有【+，-】号,第一个字符必须为【+，-】号或不输入符号！'))
    }
  }
  if (nubvalue !== '') {
    if (isNaN(nubvalue)) {
      callback(new Error('警告：请输入正确的浮点数据类型，如：【4,231.66】，【-4,231.66】'))
    }
  }
  callback()
}
/**
 * 校验规则生成方法
 */
export function validDecimal () {
  return { validator: (rule, value, callback) => { validateDecimal(rule, value, callback) }, trigger: 'blur' }
}
/**
 * 校验浮点数据类型callback方法
 */
export function validateNumber (rule, value, callback) {
  let valueStr = value.toString()
  let nubvalue = valueStr.replace(/-/g, '')
  nubvalue = nubvalue.replace('+', '')
  if (valueStr.split('-').length > 2 || valueStr.split('+').length > 2 || valueStr.split('.').length > 2) {
    callback(new Error('警告：请输入正确的数字,不能包含多个【+，- ，.】符号！'))
  }
  if ((valueStr.indexOf('-') !== -1 || valueStr.indexOf('+') !== -1) && nubvalue === '') {
    callback(new Error('警告：请输入正确的数字,不能仅包含【+，-】符号！'))
  }
  if ((valueStr.indexOf('-') !== -1 || valueStr.indexOf('+') !== -1) && nubvalue !== '') {
    let firstChar = valueStr.substring(0, 1)
    if (firstChar !== '-' && firstChar !== '+') {
      callback(new Error('警告：请输入正确的数字,第一个字符必须为【+，-】或不输入符号！'))
    }
  }
  if (nubvalue !== '') {
    if (isNaN(nubvalue)) {
      callback(new Error('警告：请输入正确的数字！'))
    }
  }
  callback()
}
export function validNumber (i, m) {
  let mge = '警告：输入内容必须为'
  if (i !== undefined) {
    mge = mge + '大于' + i
  }
  if (m !== undefined) {
    mge = mge + '小于' + m
  }
  mge = mge + '数字！'
  let rule = {}
  if (i !== undefined && m !== undefined) {
    rule = { type: 'number', min: i, max: m, message: mge }
  } else if (i === undefined && m !== undefined) {
    rule = { type: 'number', max: m, message: mge }
  } else if (i !== undefined && m === undefined) {
    rule = { type: 'number', min: i, message: mge }
  } else {
    rule = { type: 'number', message: mge }
  }
  return rule
}

/**
 * 校验整型，数字，不能输入小数点
 *  */
export function validateInt (rule, value, callback) {
  if (value) {
    if (((value.toString()).indexOf('.')) !== -1) {
      callback(new Error('警告：不能输入小数！'))
    }
  }
  callback()
}
/**
 * 校验整型，数字，不能输入小数点
 *  */
export function validInt () {
  let rule = []
  let formRules = { validator: (rule, value, callback) => { validateInt(rule, value, callback) } }
  let numberRule = { validator: (rule, value, callback) => { validateNumber(rule, value, callback) } }
  rule.push(numberRule)
  rule.push(formRules)
  return rule
}

/**
 *
 * 输入内容不能包含否含有中文
 *  */
export function validateCannotIncludeChinese (rule, value, callback) {
  if (!value) {
    return callback()
  }
  var reg = /[\u4e00-\u9fa5]/g
  if (reg.test(value)) {
    callback(new Error('警告：输入内容不能包含中文！'))
  }
  callback()
}
/**
 * 输入内容不能包含否含有中文
 *  */
export function validCannotIncludeChinese () {
  let formRules = { validator: (rule, value, callback) => { validateCannotIncludeChinese(rule, value, callback) } }
  return formRules
}
/**
 *
 * 输入内容必须包含否含有中文
 *  */
export function validateMustIncludeChinese (rule, value, callback) {
  if (!value) {
    return callback()
  }
  var reg = /[\u4e00-\u9fa5]/g
  if (!reg.test(value)) {
    callback(new Error('警告：输入内容必须包含中文！'))
  }
  callback()
}
/**
 *  输入内容必须包含否含有中文
 *  */
export function validMustIncludeChinese () {
  let formRules = { validator: (rule, value, callback) => { validateMustIncludeChinese(rule, value, callback) } }
  return formRules
}
/**
 *  输入内容必须包含否含有中文
 *  */
export function validIdCardNo () {
  let formRules = { validator: (rule, value, callback) => { validateIdCardNo(rule, value, callback) } }
  return formRules
}
/**
 *  身份证号校验
 *  */
export function validateIdCardNo (rule, value, callback) {
  if (value) {
    var cardNum = value
    var r15, r18, re
    re = /^\d{15}$/g
    r15 = cardNum.match(re)
    re = /(^\d{18}$)|(^(\d{17}(x|X)))/g
    r18 = cardNum.match(re)

    if (r15 == null && r18 == null) {
      callback(new Error('警告：身份证号只能输入15位或18位数字，18位末尾允许为x或X！'))
    }

    // 判断出生年月
    if (cardNum.length !== 18 && cardNum.length !== 15) {
      callback(new Error('警告：身份证号长度只能是15位或18位！'))
    }
    var birthy
    var birthm
    var birthd
    if (cardNum.length === 18) {
      birthy = parseInt(cardNum.substring(6, 10), 10)
      birthm = parseInt(cardNum.substring(10, 12), 10)
      birthd = parseInt(cardNum.substring(12, 14), 10)
    } else {
      birthy = parseInt('19' + cardNum.substring(6, 8))
      birthm = parseInt(cardNum.substring(8, 10), 10)
      birthd = parseInt(cardNum.substring(10, 12), 10)
    }

    var nowdate = new Date()
    var nowy = nowdate.getFullYear()
    var nowm = nowdate.getMonth() + 1
    var nowd = nowdate.getDate()

    // 出生年月日应该小于当前日期并且应在1900年以后
    if (birthy > nowy || (birthy === nowy && birthm > nowm) || (birthy === nowy && birthm === nowm && birthd > nowd)) {
      callback(new Error('警告：出生日期不能大于当前日期！'))
    }

    if (birthy < 1900) {
      callback(new Error('警告：出生年份不能小于1900年！'))
    }

    // 非法月日
    if (birthm > 12) {
      callback(new Error('警告：生月份不能大于12！'))
    }

    if (birthd > 31) {
      callback(new Error('警告：出生日不能大于31！'))
    }

    // 润年时2月应<=29
    if ((birthy % 4 === 0 || birthy % 100 !== 0) || birthy % 400 === 0) {
      if (birthm === 2) {
        if (birthd > 29) {
          callback(new Error('警告：出生年' + birthy + '为润年,2月不能大于29日！'))
        }
      }
    } else {
      if (birthm === 2) {
        if (birthd > 28) {
          callback(new Error('警告：出生年为非闰年，2月不能大于28日！'))
        }
      }
    }
    if (birthm === 1 || birthm === 3 || birthm === 5 || birthm === 7 || birthm === 8 || birthm === 10 || birthm === 12) {
      if (birthd > 31) {
        callback(new Error('警告：出生月为' + birthm + ',出生日不能大于31日！'))
      }
    } else if (birthd > 30) {
      callback(new Error('警告：出生月为' + birthm + '，出生日不能大于30日！'))
    }

    if (cardNum.length < 18) {
      callback()
    }
    // 校验码是正确的---
    var wi = [[7], [9], [10], [5], [8], [4], [2], [1], [6], [3], [7], [9], [10], [5], [8], [4], [2]]
    // 注意yid的第三位为X
    var yid = [1, 0, 44, 9, 8, 7, 6, 5, 4, 3, 2]
    var ysum = 0
    var len = 17
    var lastPos = cardNum.charAt(17)
    for (var i = 0; i < len; i++) {
      ysum += parseInt(cardNum.charAt(i)) * wi[i]
    }
    var yesno = ysum % 11
    if (yesno === 2) {
      if (lastPos !== 'X' && lastPos !== 'x') {
        callback(new Error('警告：校验失败！'))
      }
    } else {
      if (parseInt(lastPos) !== yid[yesno]) {
        callback(new Error('警告：校验失败！'))
      }
    }
  }
  callback()
}
/**
 *校验邮政编码
 */
export function validatePostalCode (rule, value, callback) {
  if (value) {
    var postalCode = /^[a-zA-Z0-9 ]{6,7}$/
    if (!postalCode.test(value)) {
      callback(new Error('请输入正确的邮政编码'))
    } else {
      return callback()
    }
  }
  callback()
}
/**
 *  校验邮政编码
 *  */
export function validPostalCode () {
  let formRules = { validator: (rule, value, callback) => { validatePostalCode(rule, value, callback) } }
  return formRules
}
