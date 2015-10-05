var resonant = resonant || {};

$(function () {
    resonant.modalIds = $('.portfolio-modal').map(function (i, el) {
        return '#' + el.id;
    });
    var hash = window.location.hash;
    hash && $.inArray(hash, resonant.modalIds) && $(hash).modal('show');

    $('.portfolio-modal').on('show.bs.modal', function () {
        resonant.modal = $(this);
        window.location.hash = $(this).attr('id');
    }).on('hidden.bs.modal', function () {
        window.location.hash = resonant.modal = '';
    });

    $(window).on('hashchange', function () {
        !window.location.hash && resonant.modal && resonant.modal.modal('hide');
    });
});
