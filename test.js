var courseCount = 5;
for (var j = 1; j <= courseCount; j++) {
    setTimeout(function () {
        var random = Math.ceil(Math.random() * 11) + 1;
        for (var i = 2; i <= 12; i++) {
            document.getElementById('iframeautoheight').contentWindow.document.getElementById('DataGrid1__ctl' + i + '_JS1').selectedIndex = random == i ? 2 : 1;
            var ctl2 = document.getElementById('iframeautoheight').contentWindow.document.getElementById('DataGrid1__ctl' + i + '_JS2');
            if (ctl2) {
                ctl2.selectedIndex = random == i ? 2 : 1;
            }
        }
        document.getElementById('iframeautoheight').contentWindow.document.getElementById('Button1').click();
    }, j * 1000);
}