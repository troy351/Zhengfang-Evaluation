var courseCount = 5;
for (var j = 1; j <= courseCount; j++) {
    setTimeout(function () {
        var random = Math.ceil(Math.random() * 11) + 1;
        var frameDocument = document.getElementById('iframeautoheight').contentWindow.document;
        for (var i = 2; i <= 12; i++) {
            frameDocument.getElementById('DataGrid1__ctl' + i + '_JS1').selectedIndex = random == i ? 2 : 1;
            var ctl2 = frameDocument.getElementById('DataGrid1__ctl' + i + '_JS2');
            if (ctl2) {
                ctl2.selectedIndex = random == i ? 2 : 1;
            }
        }
        frameDocument.getElementById('Button1').click();
    }, j * 1000);
}