/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$head = $('head'),
		$body = $('body'),
		settings = {

			// Carousels
				carousels: {
					speed: 4,
					fadeIn: true,
					fadeDelay: 250
				},
			};

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px'],
		'xlarge-to-max': '(min-width: 1681px)',
		'small-to-xlarge': '(min-width: 481px) and (max-width: 1680px)'
	});
	
	// Words count
	document.addEventListener('DOMContentLoaded', function() {
    const postContent = document.getElementById('post-content');
    const postMeta = document.getElementById('post-meta');

    // Menghitung jumlah kata
    const text = postContent.innerText || postContent.textContent;
    const words = text.split(/\s+/).filter(word => word.length > 0).length;

    // Estimasi waktu membaca (diasumsikan 200 kata per menit)
    const wordsPerMinute = 200;
    const readingTime = Math.ceil(words / wordsPerMinute);

    // Menambahkan hasil di halaman tanpa menghapus konten sebelumnya
    postMeta.innerHTML += `
     <p><i class="fas fa-book"></i> ${words} kata • <i class="fas fa-eye"></i> estimasi membaca ${readingTime} menit</p>`;
});

// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			speed: 350,
			noOpenerFade: true,
			alignment: 'center'
		});

// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Stops animations/transitions until the page has ...

	// ... loaded.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// ... stopped resizing.
	var resizeTimeout;

	$window.on('resize', function () {

		// Mark as resizing.
		$body.addClass('is-resizing');

		// Unmark after delay.
		clearTimeout(resizeTimeout);

		resizeTimeout = setTimeout(function () {
			$body.removeClass('is-resizing');
		}, 100);

	});

	// Fixes.

	// Object fit images.
	if (!browser.canUse('object-fit')
		|| browser.name == 'safari')
		$('.image.object').each(function () {

			var $this = $(this),
				$img = $this.children('img');

			// Hide original image.
			$img.css('opacity', '0');

			// Set background.
			$this
				.css('background-image', 'url("' + $img.attr('src') + '")')
				.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
				.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

		});

	// Carousels.
	$('.carousel').each(function() {

		var	$t = $(this),
			$forward = $('<span class="forward"></span>'),
			$backward = $('<span class="backward"></span>'),
			$reel = $t.children('.reel'),
			$items = $reel.children('article');

		var	pos = 0,
			leftLimit,
			rightLimit,
			itemWidth,
			reelWidth,
			timerId;

		// Items.
			if (settings.carousels.fadeIn) {

				$items.addClass('loading');

				$t.scrollex({
					mode: 'middle',
					top: '-20vh',
					bottom: '-20vh',
					enter: function() {

						var	timerId,
							limit = $items.length - Math.ceil($window.width() / itemWidth);

						timerId = window.setInterval(function() {
							var x = $items.filter('.loading'), xf = x.first();

							if (x.length <= limit) {

								window.clearInterval(timerId);
								$items.removeClass('loading');
								return;

							}

							xf.removeClass('loading');

						}, settings.carousels.fadeDelay);

					}
				});

			}

		// Main.
			$t._update = function() {
				pos = 0;
				rightLimit = (-1 * reelWidth) + $window.width();
				leftLimit = 0;
				$t._updatePos();
			};

			$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };

		// Forward.
			$forward
				.appendTo($t)
				.hide()
				.mouseenter(function(e) {
					timerId = window.setInterval(function() {
						pos -= settings.carousels.speed;

						if (pos <= rightLimit)
						{
							window.clearInterval(timerId);
							pos = rightLimit;
						}

						$t._updatePos();
					}, 10);
				})
				.mouseleave(function(e) {
					window.clearInterval(timerId);
				});

		// Backward.
			$backward
				.appendTo($t)
				.hide()
				.mouseenter(function(e) {
					timerId = window.setInterval(function() {
						pos += settings.carousels.speed;

						if (pos >= leftLimit) {

							window.clearInterval(timerId);
							pos = leftLimit;

						}

						$t._updatePos();
					}, 10);
				})
				.mouseleave(function(e) {
					window.clearInterval(timerId);
				});

		// Init.
			$window.on('load', function() {

				reelWidth = $reel[0].scrollWidth;

				if (browser.mobile) {

					$reel
						.css('overflow-y', 'hidden')
						.css('overflow-x', 'scroll')
						.scrollLeft(0);
					$forward.hide();
					$backward.hide();

				}
				else {

					$reel
						.css('overflow', 'visible')
						.scrollLeft(0);
					$forward.show();
					$backward.show();

				}

				$t._update();

				$window.on('resize', function() {
					reelWidth = $reel[0].scrollWidth;
					$t._update();
				}).trigger('resize');

			});

	});

	

})(jQuery);