/**
 * Created by Andy on 2016/1/14.
 */
fetch('/api/files')
    .then(function(response) {
        return response.json();
    }).then(function (fileArray) {
    fileArray.forEach(function (filePath) {
        var fileName = filePath.substr(filePath.lastIndexOf('\\'));
        var a = $('<a href="{0}">{0}</a><br/>'.format(fileName));
        $('#listContainer').append(a);
    })
})

var maxSize = 5*1024*1024;
$('input[name="uploadFile"]').bind('change', function() {

    //this.files[0].size gets the size of your file.
    if(this.files[0].size>maxSize){
        alert("File should not exceed 5 MB!!");
        $('#uploadBtn').attr('disabled',true);
    }else {
        $('#uploadBtn').removeAttr('disabled');
    }
});
