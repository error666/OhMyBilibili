var keywordsDisplay = localStorage.keywords.split(',');
var defenseCount = localStorage.defenseCount;
displayKeywords();
displaydefenseCount();

// 将所有想屏蔽的关键词放在单独的span里显示出来
function displayKeywords() {
    // 清除已有的 span 元素，防止重复显示
    $('#display-keywords').empty();
    if (localStorage.keywords) {
        keywordsDisplay = localStorage.keywords.split(',');
        for (var i = 0; i < keywordsDisplay.length; i++) {
            var wordSpan = document.createElement('span');
            wordSpan.setAttribute("tabindex", "-1")
            wordSpan.innerHTML = keywordsDisplay[i];
            wordSpan.className = "item-word";

            // 添加关键词右侧的删除按钮
            var removeButton = document.createElement('a');
            removeButton.className = "remove-button";
            removeButton.setAttribute("style", "display:none");
            removeButton.onclick = function() {
                removeFromLocalStorage(this.parentNode.firstChild.nodeValue);
            };
            wordSpan.appendChild(removeButton);
            document.getElementById('display-keywords').appendChild(wordSpan);
            wordSpan.onmouseover = function() {
                this.childNodes[1].removeAttribute("style");
            }
            wordSpan.onmouseout = function() {
                this.childNodes[1].setAttribute("style", "display:none");
            }
        }
    }
}


function displaydefenseCount() {
    if (defenseCount) {
        $("#defense-count-num").html(defenseCount);
    } else {
        $("#defense-count-num").html("0");
    }
}

// 在输入框内按下回车会触发按钮单击事件
$('#new-word').keydown(function(event) {
    if (event.keyCode === 13) {
        $('#save').trigger('click');
    }
});

$('#new-word').blur(function(){
    $('#tip_text').html("");
});

$('#save').click(function() {
    var $newWordInput = $('#new-word');
    var newWord = $newWordInput.val().trim();
    if (newWord) { // 这个判断用于防止把空格作为关键字
        if (localStorage.keywords && localStorage.keywords !== '') {
            if (keywordsDisplay.indexOf(newWord) > -1) {
                $('#tip_text').html("关键字已经存在");
                return;
            }
            localStorage.keywords += (',' + newWord);
        } else {
            localStorage.keywords = newWord;
        }
        $newWordInput.val("");
        displayKeywords();
    }else{
        $('#tip_text').html("不要輸入空格！");
    }
});

// 从localStorage中删除一个关键词
function removeFromLocalStorage(value) {
    var values = localStorage.keywords.split(',');
    for (var i = 0; i < values.length; i++) {
        if (values[i] === value) {
            values.splice(i, 1);
            localStorage.keywords = values.join(',');
            displayKeywords();
            return;
        }
    }
}