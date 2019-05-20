//1 初始化数据
var init = init()
var keys = init.keys
var urls = init.urls

//生成键盘
generateKeyboards(keys, urls);

//监听动作
openUrl()

function init() {
    var keys = [
        ['Q','W','E','R','T','Y','U','I','O','P'],
        ['A','S','D','F','G','H','J','K','L'],
        ['Z','X','C','V','B','N','M']
    ]

    var urls = {
        'Q': 'qq.com',
        'W': 'weibo.com',
        'E': 'ele.me',
        'R': 'renren.com',
        'T': 'tianya.com',
        'Y': 'youtube.com',
        'U': 'uc.com' ,
        'I': 'iqiyi.com',
        'O': 'opera.com',
        'A': 'acfun.tv',
        'S': 'sohu.com',
        'Z': 'zhihu.com',
        'M': 'www.mcdonalds.com.cn'
    }

    var localUrls = localStorage.getItem('urls')
    if(localUrls) {
        urls = JSON.parse(localUrls)
    }

    return {
        keys: keys,
        urls: urls
    }
}

function generateKeyboards(keys, urls) {
    for(var i = 0, keysLength = keys.length; i < keysLength; i++) {
        var row = createElement('div', 'className', 'row')
        document.getElementById('wrapper').appendChild(row)

        var rowKeys = keys[i]
        for(var j = 0, rowLength = rowKeys.length; j < rowLength; j++) {
            var kbd = createElement('kbd', 'className', 'key')
            var kbdText = createElement('span', 'textContent', rowKeys[j])
            var kbdImg = createImg(urls[rowKeys[j]])
            var kbdButton = createButton(rowKeys[j])

            row.appendChild(kbd);
            kbd.appendChild(kbdText)
            kbd.appendChild(kbdImg)
            kbd.appendChild(kbdButton)
        }
    }
}

function createImg(domain) {
    var kbdImg = createElement('img')
    if(domain) {
        kbdImg.src = 'http://' + domain + '/favicon.ico'
    } else {
        kbdImg.src = 'https://i.loli.net/2019/05/20/5ce24675062eb18989.png'
    }
    kbdImg.onerror = function (e) {
        e.target.src = 'https://i.loli.net/2019/05/20/5ce24675062eb18989.png'
    }
    return kbdImg
}

function createButton(id) {
    var kbdButton = createElement('button', 'textContent', '编辑')
    kbdButton.id = id  //g
    kbdButton.onclick = function(e) {
        var button = e.target
        var url = prompt('给我一个网址')
        urls[button.id.toUpperCase()] = url;
        var img = button.previousSibling
        img.src = 'http://' + url + '/favicon.ico'
        img.onerror = function (e) {
            e.target.src = 'https://i.loli.net/2019/05/20/5ce24675062eb18989.png'
        }
    }
    localStorage.setItem('urls', JSON.stringify(urls))
    return kbdButton
}

function createElement(eleName, eleAttr, attrValue) {
    var ele = document.createElement(eleName)
    if(eleAttr) {
        ele[eleAttr] = attrValue
    }
    return ele
}

function openUrl() {
    document.onkeypress = function (e) {
        if(urls[e.key.toUpperCase()]) {
            window.open('http://' + urls[e.key.toUpperCase()]);
        }else {
            alert('无网址')
        }
    }
}







