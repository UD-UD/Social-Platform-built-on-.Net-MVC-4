$('#button').click(function () {
    $("input[type='file']").trigger('click');
})

$("input[type='file']").change(function () {
    $('#val').text(this.value.replace(/C:\\/i, ''))
})