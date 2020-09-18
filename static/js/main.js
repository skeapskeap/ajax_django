$(document).ready(function (){

    function getCookie(name) {
        var cookieValue = null;

        if (document.cookie && document.cookie !=='') {
            var cookie = document.cookie.split(';');

            for (var i = 0; i < cookie.length; i++) {
                var cookie = cookie[i].trim();

                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    var csrfToken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        return ['GET', 'OPTIONS', 'HEAD', 'TRACE'].includes(method);
    }

    $.ajaxSetup({
        beforeSend: function(xhr, setting) {
            if (!csrfSafeMethod(setting.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrfToken);
            }     
        }
    });

    $(".btn").click(function (){
        $.ajax({
            url: '',
            type: 'get',
            data: {
                button_text: $(this).text()
            },
            success: function(response) {
                $(".btn").text(response.seconds)
                $("#seconds").append('<li>' + response.seconds + '</li>')
            }
        });
    });

    $("#seconds").on('click', 'li', function () {
        $.ajax({
            url: '',
            type: 'post',
            data: {
                text: $(this).text()
            },
            success: function(response) {
                $("#right").append('<li>' + response.data + '</li>')
            }
        })
    });

});