var keywordsDisplay = localStorage.keywords.split(',');
var defenseCount = localStorage.defenseCount;
displayKeywords();
displaydefenseCount();

// �����������εĹؼ��ʷ��ڵ�����span����ʾ����
function displayKeywords() {
    // ������е� span Ԫ�أ���ֹ�ظ���ʾ
    $('#display-keywords').empty();
    if (localStorage.keywords) {
        keywordsDisplay = localStorage.keywords.split(',');
        for (var i = 0; i < keywordsDisplay.length; i++) {
            var wordSpan = document.createElement('span');
            wordSpan.setAttribute("tabindex", "-1")
            wordSpan.innerHTML = keywordsDisplay[i];
            wordSpan.className = "item-word";

            // ��ӹؼ����Ҳ��ɾ����ť
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

// ��������ڰ��»س��ᴥ����ť�����¼�
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
    if (newWord) { // ����ж����ڷ�ֹ�ѿո���Ϊ�ؼ���
        if (localStorage.keywords && localStorage.keywords !== '') {
            if (keywordsDisplay.indexOf(newWord) > -1) {
                $('#tip_text').html("�ؼ����Ѿ�����");
                return;
            }
            localStorage.keywords += (',' + newWord);
        } else {
            localStorage.keywords = newWord;
        }
        $newWordInput.val("");
        displayKeywords();
    }else{
        $('#tip_text').html("��Ҫݔ��ո�");
    }
});

// ��localStorage��ɾ��һ���ؼ���
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