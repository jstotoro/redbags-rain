$(function () {
    'use strict';

    init();

    function init() {
        // 倒计时
        countdown(2, 'nozero', function () {
            redRainInit();
        });
        // 事件
        bindEvents();
    }

    function bindEvents() {
        // 红包被点击
        $('.canvas').on('click', '.item', function () {
            $(this).stop().fadeOut();
        });
    }

    function countdown(second, demand, callback) {
        if (typeof demand == 'function') {
            callback = demand;
            demand = '';
        }

        var i = second;
        var point = demand == 'nozero' ? 0 : -1;

        var timer = setInterval(function () {
            if (i == point) {
                clearInterval(timer);
                if (callback) {
                    callback();
                }
            }
            else {
                var $countdown = $('.countdown' + (second + 1));
                if ($countdown.hasClass('hidden')) {
                    $countdown.removeClass('hidden');
                }
                $countdown.text(i);
                i--;
            }
        }, 1000);

    }

    function redRainInit() {
        $('.content-init').hide();
        $('.content-ing').fadeIn();

        // 抢红包
        var windowWidth = $(window).width() - 80,
            windowHeight = $(window).height();

        var $canvas = $('.canvas');

        $canvas.css({
            height: windowHeight
        });

        // 添加红包
        for (var i = 0; i < 20; i++) {
            var $item = $('<div class="item">');

            $item.css({
                'left': Math.random() * windowWidth
            });

            $canvas.append($item);
        }

        // 红包动画 定时执行
        var idx = 0;
        var moveTimer = setInterval(function () {
            moveHandler(idx);
            idx++;
            if (idx == 20) {
                idx = 0;
            }
        }, 500);

        // countdown
        countdown(9, function () {
            clearInterval(moveTimer);
            renderResult();
        });
    }

    // 红包动画 下落效果
    function moveHandler(idx) {
        var speed = Math.random() * (8000 - 3000) + 3000; // 下落速度

        var $item = $('.canvas .item').eq(idx);
        // $item.animate({
        //     top: 600,
        // }, speed, function () {
        //     $(this).css({
        //         top: -50
        //     })
        // });
        $item.css({
            animation:"RedBag 3s linear",
        });
    }

    function renderResult() {
        $('.content-ing').hide();
        $('.game_alert').fadeIn();
        $('.alert_money').text("￥"+parseInt(200*Math.random())+"元");
    }
});

$('.game_alert_btn').click(function(event) {
    $('.game_alert').fadeOut();
});