$(function () {
    /*=================================================
    ハンバーガ―メニュー
    ===================================================*/
    // ハンバーガーメニューをクリックした時
    $(".hamburger").on("click", function () {
        // toggleClassを使用することで、hamburgerクラスにactiveクラスが存在する場合は削除、
        // 存在しない場合を追加する処理を自動で行ってくれる
        $("header").toggleClass("open");
    });
    // メニューのリンクをクリックした時
    $("#navi a").on("click", function () {
        $("header").toggleClass("open");
    });

    $(".slick-area").slick({
        arrows: false,
        centerMode: true,
        centerPadding: "100px",
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 780,
                settings: {
                    centerPadding: "100px",
                    slidesToShow: 1,
                },
            },
        ],
    });

    parallax();

    //Simple Parallax Vanilla JS
    function parallax() {
        'use strict';

        //class設定
        //表示エリア class
        const targetClass = '.js-parallax-elm-box';
        //動かす要素 class
        const childClass = '.js-parallax-elm';

        //表示エリア取得
        const targets = Array.prototype.slice.call(document.querySelectorAll(targetClass), 0);
        //表示エリアが存在するかチェック
        if (targets.length === 0) {
            return false;
        }

        //ウィンドウの高さ取得
        let winH = window.innerHeight;

        //パララックス関数呼び出し
        parallaxFunk();
        window.addEventListener('resize', function () {
            winH = window.innerHeight;
            requestAnimationFrame(parallaxFunk);
        });
        window.addEventListener('scroll', function () {
            requestAnimationFrame(parallaxFunk);
        });

        //パララックス関数
        function parallaxFunk() {
            //スクロール量（ウィンドウの上端）取得
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            //スクロール量（ウィンドウの下端）取得
            const scrollBottom = scrollTop + winH;

            //表示エリアごとの設定
            targets.forEach(function (target) {
                //表示エリアの位置取得
                const targetPosi = target.getBoundingClientRect().top + scrollTop;
                //表示エリアの高さ取得
                const targetHeight = target.clientHeight;
                //表示領域の取得
                const targetShowPosi = targetPosi - winH;
                //表示エリアの終了位置取得
                const targetEndPosi = targetPosi + targetHeight;

                //表示エリアがモニター画面に入った場合の処理
                if (scrollTop > targetShowPosi && scrollTop < targetEndPosi) {
                    //動かす要素を取得
                    const child = target.querySelector(childClass);
                    //動かす要素が存在するかチェック
                    if (!child) {
                        return false;
                    }
                    //動かす要素の高さ取得
                    const childHeight = child.clientHeight;
                    //パララックス スクロールできる最大量を取得
                    const maxVal = (childHeight - targetHeight);

                    //ウィンドウの高さに対するスクロール量を取得（小数点第2以下は四捨五入）
                    const setVal = ((scrollBottom - targetPosi) * (maxVal / (winH + targetHeight))).toFixed(1);
                    //スクロール値を設定
                    child.style.transform = 'translate3d(0,' + (-setVal) + 'px,0)';
                }
            });
        }
    }

});