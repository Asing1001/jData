/**
 * Created by Andy on 2016/1/14.
 */
fetch('/api/files')
    .then(function(response) {
        return response.json();
    }).then(function(fileArray) {
        fileArray.forEach(function(filePath) {
            var fileName = filePath.substr(filePath.lastIndexOf('\\') + 1);
            var li = document.createElement('li');
            var a = $(`<a href="/api/files/${fileName}">${fileName}</a>`);
            var editLink = $(`<a class="button small" href="/edit/${fileName}">Edit</a>`);
            var deleteBtn = $(`<button class="deleteBtn small" type="button" data-file-name="${fileName}">Delete</button>`);

            $(li).append(a);
            $(li).append(editLink);
            $(li).append(deleteBtn);
            $('#listContainer').append(li);
        })
    })

var maxSize = 5 * 1024 * 1024;
$('input[name="uploadFile"]').bind('change', function() {

    //this.files[0].size gets the size of your file.
    if (this.files[0].size > maxSize) {
        alert("File should not exceed 5 MB!!");
        $('#uploadBtn').attr('disabled', true);
    } else {
        $('#uploadBtn').removeAttr('disabled');
    }
});

$(document).on('click', '.deleteBtn', (event) => {
    var pwd = prompt("Please input password to delete : ");
    if (pwd) {
        fetch(`/api/files/${event.target.dataset.fileName}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pwd })
        }).then(res => res.text()).then(text => {
            alert(text);
            location.reload();
        })
    }
})

document.getElementById("createFileBtn").onclick = () => {
    var filename = prompt("Please enter the file name :");
    if (filename) {
        location.href = `/edit/${filename}`;
    }
}