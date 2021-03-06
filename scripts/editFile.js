/**
 * Created by Andy on 2016/1/14.
 */
var fileName = location.href.substring(location.href.lastIndexOf('/') + 1, location.href.length);
var originUrl = location.origin + "/api/files/" + fileName;

var textArea = document.createElement('textarea');
textArea.setAttribute('rows', "20");
textArea.setAttribute('cols', '100');
textArea.style.border = "1px solid black";

var btnSave = document.createElement('button');
btnSave.textContent = "Save";
btnSave.onclick = function(e) {
    fetch(location.origin + '/api/files/' + fileName, {
        method: "PUT",
        headers: {
            "Content-Type": "text/plain"
        },
        body: textArea.value
    }).then(function(res) {
        if (res.ok) {
            alert("update success!");
        }
    });
}

var p = document.createElement('p');
p.textContent = `FileLocation:`;

var copyTextarea = document.createElement('textarea');
copyTextarea.textContent = `${originUrl}`;
copyTextarea.setAttribute('cols', '100');

var btnCopy = document.createElement('button');
btnCopy.textContent = "Copy";
btnCopy.onclick = () => {
    copyTextarea.select();
    document.execCommand('copy');
}

document.body.appendChild(textArea);
document.body.appendChild(btnSave);
document.body.appendChild(p);
document.body.appendChild(copyTextarea);
document.body.appendChild(btnCopy);

fetch(originUrl).then(function(res) {
    if (res.ok) {
        return res.text();
    }
}).then(function(data) {
    console.log(data);
    try {
        textArea.textContent = JSON.stringify(JSON.parse(data), undefined, 2);
    } catch (ex) {
        console.error(ex);
        textArea.textContent = data;
    }
});