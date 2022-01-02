$(document).ready(function () {
    $('.menu-option-car').hover(function (e) {
            e.preventDefault();
            $(this).addClass('active img price');
            $(this).removeClass("align");
            $('.price').css('display', 'flex');

        }, function () {
            $(this).removeClass("active img price");
            $(this).addClass("align");

            $('.car-object').remove("img");
            $('.price').css('display', 'none');

            $('img').css('display', 'flex');
        }
    );
});
