/**
 * Created by Andy on 2016/1/14.
 */
var fileName = location.href.substring(location.href.lastIndexOf('/') + 1, location.href.length);
var originUrl = location.origin + "/" + fileName;
var putUrl = location.origin + '/api/files/' + fileName;
var textArea = document.createElement('textarea');
textArea.setAttribute('rows', "30");
textArea.setAttribute('cols', '100');
textArea.style.border = "1px solid black";
//textArea.style.display = "none";
var btn = document.createElement('button');
btn.textContent = "Save";
//btn.style.display = "none";
document.body.appendChild(textArea);
document.body.appendChild(btn);
fetch(originUrl).then(function (res) {
    if (res.ok) {
        return res.json();
    }
}).then(function (data) {
    console.log(data);
    textArea.textContent = JSON.stringify(data, undefined, 2);
});

btn.onclick = function (e) {
    var jsonArr;
    var json;
    try {
        var contextArr = JSON.parse(textArea.value);
        json = textArea.value;
    }
    catch (e) {
        alert("json format error");
        return;
    }
    console.log('changed json object', contextArr);
    fetch(putUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: json
    }).then(function (res) {
        if (res.ok) {
            alert('success update!!');
        }
    });

}