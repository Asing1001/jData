/**
 * Created by Andy on 2016/1/14.
 */
fetch('/api/files')
    .then(function (response) {
        return response.json();
    }).then(function (fileArray) {
        fileArray.forEach(function (filePath) {
            var fileName = filePath.substr(filePath.lastIndexOf('\\') + 1);
            var a = $(`<a href="/${fileName}">${fileName}</a>`);
            var editLink = $(`<a style="margin-left:10px" href="/edit/${fileName}">Edit</a><br/>`);
            $('#listContainer').append(a);
            $('#listContainer').append(editLink);
        })
    })

var maxSize = 5 * 1024 * 1024;
$('input[name="uploadFile"]').bind('change', function () {

    //this.files[0].size gets the size of your file.
    if (this.files[0].size > maxSize) {
        alert("File should not exceed 5 MB!!");
        $('#uploadBtn').attr('disabled', true);
    } else {
        $('#uploadBtn').removeAttr('disabled');
    }
});

document.getElementById("createFileBtn").onclick = () => {
    var filename = prompt("Please enter the file name :");
    if (filename) {
        location.href = `${location.origin}/edit/${filename}`;
    }
}