$(document).ready(function (){ //метод jQuery ready() начинает работать когда готов DOM, медиа-контент может загружаться позже
    
    function getCookie(name) { //функция парсит document.cookie по аргументу (name='csrftoken') и возвращает значение токена
        var cookieValue = null;

        if (document.cookie && document.cookie !=='') {
            var cookie = document.cookie.split(';');                            //cookie это строка из элементов с ключами и разделителем ';'

            for (var i = 0; i < cookie.length; i++) {                           //проход по списку нарезанному из cookies
                var cookie = cookie[i].trim();                                  //trim аналог strip в python

                if (cookie.substring(0, name.length + 1) === (name + '=')) {    //если найден элемент с ключем (name)
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    var csrfToken = getCookie('csrftoken'); //присваивает в переменную csrfToken результат функции getCookie

    function csrfSafeMethod(method) {       //функция возвращает true для методов !='POST'
        return ['GET', 'OPTIONS', 'HEAD', 'TRACE'].includes(method);
    }

    $.ajaxSetup({                           //функция запихивает csrfToken в http header потому что так круче, чем передавать его внутри POST
        beforeSend: function(xhr, setting) {
            if (!csrfSafeMethod(setting.type) && !this.crossDomain) { //setting.type возвращает метод, в нашем случае POST
                xhr.setRequestHeader("X-CSRFToken", csrfToken);
            }     
        }
    });

    $(".btn").click(function (){    //выполняется по клику на элемент с классом=btn
        $.ajax({
            url: '',               //куда переходить
            type: 'get',           //метод http 
            data: {                //что передавать в поле data get запроса (словарь в словаре)
                button_text: $(this).text()         //$(this).text() это поле text элемента btn, с которого началась вся возня
            },
            success: function(response) {           //функция выполняется в случае успешной записи значений в словарь выше
                $(".btn").text(response.seconds)    //записывает в поле text эелемента btn новое значение из response
                $("#seconds").append('<li>' + response.seconds + '</li>') //добавляет в элемент с id='seconds' новый элемент списка <li> со значением response.seconds
            }
        });
    });

    $("#seconds").on('click', 'li', function () {   //выполняется по клику на дочерний элемент <li> элемента с id='seconds'
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

    $("#action_id").change(function() {             //выполняется если в поле action что-то поменялось
        var action = $("#action_id").val();         //узнает, какое значение выбрано в action
        if (action === "new_mac") {                 //если выбрано "поменять мак"
            $("#input_mac").css('display', 'block');//делает свойство css "display"="block" для id=input_mac 
        }

        else {
            $("#input_mac").css('display', 'none');//делает свойство css "display"="none" для id=input_mac 
        }
        
    });

});