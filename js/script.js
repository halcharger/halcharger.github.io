$(document).ready(function() {

    //---------------------------------- Form validation-----------------------------------------//




    $('#formSubmit').click(function() {

        $('input#name').removeClass("errorForm");
        $('textarea#message').removeClass("errorForm");
        $('input#email').removeClass("errorForm");

        var error = false;
        var name = $('input#name').val();
        if (name == "" || name == " ") {
            error = true;
            $('input#name').addClass("errorForm");
        }


        var msg = $('textarea#message').val();
        if (msg == "" || msg == " ") {
            error = true;
            $('textarea#message').addClass("errorForm");

        }

        var email_compare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        var email = $('input#email').val();
        if (email == "" || email == " ") {
            $('input#email').addClass("errorForm");
            error = true;
        } else if (!email_compare.test(email)) {
            $('input#email').addClass("errorForm");
            error = true;
        }

        if (error == true) {
            return false;
        }

        var data_string = $('.touch form').serialize();

        var email = {
            From: $('#email').val(),
            Subject: 'allenfirth.info web message from: ' + $('#name').val(),
            Body: $('#message').val()
        };
        //alert('about to post: From: ' + email.From + ', Subject: ' + email.Subject + ', Body: ' + email.Body);
        $.post('http://simplewebapimailer.cloudapp.net:80/api/send', email, function(data) {
            $('#success').fadeIn('slow');
        }).fail(function() {
            $('#failure').fadeIn('slow');
        });

        return false;
    });



    //---------------------------------- End form validation-----------------------------------------//


    //------------------------------------- Navigation setup ------------------------------------------------//


    //--------- Scroll navigation ---------------//

    $("#mainNav ul a, .logo a, a.contactShort").click(function(event) {

        event.preventDefault();
        var full_url = this.href;
        var parts = full_url.split("#");
        var trgt = parts[1];
        var target_offset = $("#" + trgt).offset();
        var target_top = target_offset.top;

        $('html,body').animate({
            scrollTop: target_top - 93
        }, 800);


    });


    //-------------Highlight the current section in the navigation bar------------//
    var sections = $("section");
    var navigation_links = $("#mainNav a");

    sections.waypoint({
        handler: function(event, direction) {

            var active_section;
            active_section = $(this);
            if (direction === "up") active_section = active_section.prev();

            var active_link = $('#mainNav a[href="#' + active_section.attr("id") + '"]');
            navigation_links.removeClass("active");
            active_link.addClass("active");

        },
        offset: '35%'
    });


    //------------------------------------- End navigation setup ------------------------------------------------//


    //--------------------------------- Hover animation for the elements of the portfolio --------------------------------//


    $(".link").css({
        opacity: 0
    });
    $('.work, .item').hover(function() {
        $(this).children('.link ').animate({
            opacity: 0.95
        }, 'fast');
    }, function() {
        $(this).children('.link ').animate({
            opacity: 0
        }, 'slow');
    });



    //--------------------------------- End hover animation for the elements of the portfolio --------------------------------//

});