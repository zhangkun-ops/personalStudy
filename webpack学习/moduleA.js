// var susanModule = (function () {
//   var name = 'susan';
//   var sex = '女孩';
//   return {
//     tell:function () {
//       console.log('我的名字是', name)
//       console.log('我的性别是', sex)
//     }
//   }
// })()
(function (window) {
  var name = 'susan';
  var sex = '女孩';
  function tell() {
    console.log('我的名字是', name)
    console.log('我的性别是', sex)
  }
  window.susanModule = {tell}
})(window)