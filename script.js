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

// 当页面加载更多答案的时候，重新运行处理程序
// 使用MutationObserver来检测页面的变动
let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
let observerMutationSupport = !!MutationObserver;
if (observerMutationSupport) {
  let observer = new MutationObserver((mutations) => {
    mutations.forEach((item) => {
      processPage();
    });
  });
  const options = {
    "childList": true, //子节点的变动
    "attributes": true, //属性的变动
    "characterData": true, //节点内容或节点文本的变动
    "subtree": true, //所有后代节点的变动
    "attributeOldValue": true, //表示观察attributes变动时，是否需要记录变动前的属性
    "characterDataOldValue": true //表示观察characterData变动时，是否需要记录变动前的值
  };
  observer.observe(document, options);
}

/* 主要的处理函数 */
function processPage() {
  // alert("LOVE AND PEACE");
  for (var i = 0; i < keywords.length; i++) {
    var keyword = keywords[i];
    if (keyword) { // 防止出现所有答案都被屏蔽的情况（可以用其它的方法来避免）
      var dislikething = $("[title*='" + keyword + "'],[data-txt*='" + keyword + "'],[data-up*='" + keyword + "']");
      // console.log(dislikething)
      dislikething.each(function() {
        if ($(this).parents("li")[0]) {
          count += 1;
          chrome.runtime.sendMessage({
            method: "sendDefenseCount",
            param: count
          });
          console.log("已经干掉了:" + count);
          $(this).parents("li")[0].remove();
        }
        if ($(this).parents(".spread-module")[0]) {
          count += 1;
          chrome.runtime.sendMessage({
            method: "sendDefenseCount",
            param: count
          });
          console.log("已经干掉了:" + count);
          $(this).parents(".spread-module")[0].remove();
        }
        if($(this).parents("[class*='small-item fakeDanmu-item']")[0]){
          count += 1;
          chrome.runtime.sendMessage({
            method: "sendDefenseCount",
            param: count
          });
          console.log("已经干掉了:" + count);
          $(this).parents("[class*='small-item fakeDanmu-item']")[0].remove();
        }
      });
    }
  }

}