var script = document.createElement("script");
script.type = "text/javascript";
script.src = 'http://cdn.bootcss.com/jquery/1.11.3/jquery.min.js';
document.getElementsByTagName("head")[0].appendChild(script);

script.onload = function () {
    var iframe = document.getElementById('iframeautoheight');
    var pjkc = iframe.contentWindow.document.getElementById('pjkc');
    var courseCount = pjkc.length;
    var courseNames = [];
    for (var i = 0; i < pjkc.childNodes.length; i++) {
        var option = pjkc.childNodes[i];
        if (option.nodeName == '#text') {
            continue;
        }
        courseNames.push(option.innerText);
    }
    evaluate(iframe);
    var cc = 0;
    console.log('已评价: ' + courseNames[cc]);
    iframe.onload = function () {
        if (cc < courseCount - 1) {
            evaluate(iframe);
            cc++;
            console.log('已评价: ' + courseNames[cc]);
        } else {
            console.log('所有' + courseCount + '门课程已评价完成');
        }
    };
};

function evaluate(iframe) {
    var random = Math.ceil(Math.random() * 11) + 1;
    var frame = $(iframe.contentWindow.document);
    var teacherCount = frame.find('#DataGrid1 .datelisthead').children().length - 3;
    for (var i = 2; i <= 12; i++) {
        for (var j = 1; j <= teacherCount; j++) {
            var selectId = '#DataGrid1__ctl' + i;
            if (j <= 2) {
                selectId += '_JS' + j;
            } else {
                selectId += '_js' + j;
            }
            frame.find(selectId).get(0).selectedIndex = random == i ? 2 : 1;
        }
    }
    frame.find('#Button1').trigger('click');
}