<script>
	import { onMount, afterUpdate } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let slider;
	let sliderWrapper;
	let markerWrapper;
	let activeSlide;

	let target = 0;
	let current = 0;
	let ease = 0.075;
	let maxScroll;

	function lerp(start, end, factor) {
		return start + (end - start) * factor;
	}

	function updateActiveSlideNumber(markerMove, markerMaxMove) {
		const partWidth = markerMaxMove / 10;
		let currentPart = Math.round((markerMove - 70) / partWidth) + 1;
		currentPart = Math.min(10, currentPart);
		activeSlide.textContent = `${currentPart}/10`;
	}

	function update() {
		current = lerp(current, target, ease);

		gsap.set(sliderWrapper, {
			x: -current
		});

		let moveRatio = current / maxScroll;

		let markerMaxMove = window.innerWidth - markerWrapper.offsetWidth - 170;
		let markerMove = 70 + moveRatio * markerMaxMove;
		gsap.set(markerWrapper, {
			x: markerMove
		});

		updateActiveSlideNumber(markerMove, markerMaxMove);

		requestAnimationFrame(update);
	}

	onMount(() => {
		maxScroll = sliderWrapper.offsetWidth - window.innerWidth;

		window.addEventListener('resize', () => {
			maxScroll = sliderWrapper.offsetWidth - window.innerWidth;
		});

		window.addEventListener('wheel', (e) => {
			target += e.deltaY;

			target = Math.max(0, target);
			target = Math.min(maxScroll, target);
		});

		update();
	});

	afterUpdate(() => {
		maxScroll = sliderWrapper.offsetWidth - window.innerWidth;
	});
</script>

<div class="slider" bind:this={slider}>
	<div class="slider-wrapper" bind:this={sliderWrapper}>
		<div class="slide"></div>
        <div class="slide"></div>
        <div class="slide"></div>
        <div class="slide"></div>
        <div class="slide"></div>
        <div class="slide"></div>
        <div class="slide"></div>
        <div class="slide"></div>
        <div class="slide"></div>
        <div class="slide"></div>
	</div>
</div>

<div class="marker-wrapper" bind:this={markerWrapper}>
	<div class="marker">
		<div class="grab"></div>
	</div>
	<div class="active-slide" bind:this={activeSlide}>1/10</div>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html,
	body {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	nav,
	footer {
		position: fixed;
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 20px;
		font-family: 'PP Supply Sans';
		font-size: 15px;
		text-transform: uppercase;
		opacity: 0.4;
	}

	nav > div {
		display: flex;
		gap: 50px;
	}

	footer {
		bottom: 0;
	}

	.slider {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.slider-wrapper {
		width: max-content;
		padding: 0 150px;
		height: 100%;
		display: flex;
		align-items: center;
		gap: 100px;
	}

	.slide {
		width: 500px;
		height: 500px !important;
		background: gray;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.marker-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: max-content;
		height: 100vh;
	}

	.marker {
		position: relative;
		width: 2px;
		height: 100%;
		background: #000;
	}

	.marker:after {
		position: absolute;
		content: '';
		display: block;
		top: 50px;
		left: -20px;
		width: 40px;
		height: 40px;
		background-color: #fff;
		border: 2px solid #000;
		border-radius: 100%;
	}

	.active-slide {
		position: absolute;
		top: 60px;
		left: 40px;
		font-family: 'PP Supply Sans';
		font-size: 15px;
	}
</style>
