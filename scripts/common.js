/**
 * Created by Andy on 2016/1/10.
 */
fetch('/list')
    .then(function(response) {
        return response.json();
    }).then(function (fileArray) {
    fileArray.forEach(function (filePath) {
        var fileName = filePath.substr(filePath.lastIndexOf('\\'));
        var a = $('<a href="{0}">{0}</a><br/>'.format(fileName));
        $('#listContainer').append(a);
    })
})


String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};
