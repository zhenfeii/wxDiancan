const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//生成n位随机数
// 666 -_-
const getRamdomNumber = n => {
  let number = ''

  //基础：Math.floor(Math.random()*10);  //生成0-9的随机数
  for (let i = 0; i < n; i++) {
    let random = Math.floor(Math.random() * 10).toString()
    number = number + random
  }
  return number

}


module.exports = {
  formatTime: formatTime,
  getRamdomNumber: getRamdomNumber
}
