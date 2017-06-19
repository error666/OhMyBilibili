var keywords = [];
var count = 0;
// 从扩展的localStorage中获得存储的关键词
chrome.runtime.sendMessage({
  method: "getKeywords"
}, function(response) {
  str = response.keywords;
  keywords = str !== '' ? str.split(',') : [];
});

// keywords是异步获取的，可能运行至此，值还没有传过来，所以用延时来解决
if (keywords.length === 0) {
    setTimeout(function() {
        processPage();
    }, 1500);
} else {
    processPage();
}


// 当页面加载时，运行主要处理函数
// 使用MutationObserver来检测页面的变动
let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
let observerMutationSupport = !!MutationObserver;
if (observerMutationSupport) {
  let observer = new MutationObserver((mutations) => {
    mutations.forEach((item) => {
      processPage();
    });
  });

var observeClass = $('[class*=clearfix],[class*=container-row],[class=container-body],[class*=rm-list-wrp],[class*=ajax-render]');
const options = {
    "childList": true, //子节点的变动
    "characterData": true, //节点内容或节点文本的变动
    "subtree": true, //所有后代节点的变动
  };
  for (var i = observeClass.length - 1; i >= 0; i--) {
      observer.observe(observeClass[i], options);
  }
}

/* 主要的处理函数 */
function processPage() {
  // alert("LOVE AND PEACE");
  for (var i = 0; i < keywords.length; i++) {
    var keyword = keywords[i];
    if (keyword) {
      // console.log(keyword);
      var dislikething = $("[title*='" + keyword + "'],[data-txt*='" + keyword + "'],[data-up*='" + keyword + "']");
      // console.log(dislikething);
      dislikething.each(function() {
        if ($(this).parents("li")[0]) {
          count += 1;
          chrome.runtime.sendMessage({
            method: "sendDefenseCount",
            param: count
          });
          console.log($(this).parents("li")[0]);
          $(this).parents("li")[0].remove();
        }
        if($(this).is("[class*='tag-item']")){
          count +=1;
          chrome.runtime.sendMessage({
            method: "sendDefenseCount",
            param: count
          });
          this.remove();
        }
        if ($(this).parents(".spread-module")[0]) {
          count += 1;
          chrome.runtime.sendMessage({
            method: "sendDefenseCount",
            param: count
          });
          $(this).parents(".spread-module")[0].remove();
        }
        if ($(this).parents("[class*='small-item fakeDanmu-item']")[0]) {
          count += 1;
          chrome.runtime.sendMessage({
            method: "sendDefenseCount",
            param: count
          });
          $(this).parents("[class*='small-item fakeDanmu-item']")[0].remove();
        }
      });
    }
  }

}