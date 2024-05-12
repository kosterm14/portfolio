<script>
	import TextAnimation from '$lib/components/textAnimation.svelte';
	import Carousel from '$lib/components/carousel.svelte';

	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	onMount(() => {
		const contentHolderHeight = document.querySelector('.content-holder').offsetHeight;
		const imgHolderHeight = window.innerHeight;
		const additionalScrollHeight = window.innerHeight;

		const totalBodyHeight = contentHolderHeight + imgHolderHeight + additionalScrollHeight;
		document.body.style.height = `${totalBodyHeight}px`;

		const endValue = document.querySelector('.website-content').offsetHeight * 0.75;

		ScrollTrigger.create({
			trigger: '.website-content',
			start: 'bottom 10%',
			end: 'bottom 40%',
			onEnter: () => {
				gsap.set('.website-content', { position: 'absolute', top: '195%' });
			},
			onLeaveBack: () => {
				gsap.set('.website-content', { position: 'fixed', top: '0' });
			}
		});

		gsap.to('.header .letters:first-child', {
			x: () => -innerWidth * 3,
			scale: 10,
			ease: 'power2.inOut',
			scrollTrigger: {
				start: 'top top',
				end: `+=200%`,
				scrub: 1
			}
		});

		gsap.to('.header .letters:last-child', {
			x: () => innerWidth * 3,
			scale: 10,
			ease: 'power2.inOut',
			scrollTrigger: {
				start: 'top top',
				end: `+=200%`,
				scrub: 1
			}
		});

		gsap.to('.img-holder', {
			rotation: 0,
			clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
			ease: 'power2.inOut',
			scrollTrigger: {
				start: 'top top',
				end: '+=200%',
				scrub: 1
			}
		});

		gsap.to('.img-holder img', {
			scale: 1,
			ease: 'power2.inOut',
			scrollTrigger: {
				start: 'top top',
				end: '+=200%',
				scrub: 1
			}
		});
	});
</script>

<main>
	<div class="header">
		<section class="letters">
			<div><TextAnimation startText="aaaa" endText="port" /></div>
		</section>
		<section class="letters">
			<div><TextAnimation startText="aaaaa" endText="folio" /></div>
		</section>
	</div>
	<div class="website-content">
		<div class="img-holder">
			<img src="./hero.jpg" alt="" />
		</div>
		
		<div class="content-holder">
			<div class="row">
				<h1>Mijn levenswerk</h1>
				<Carousel />
			</div>
		</div>
	</div>
</main>


<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	::-webkit-scrollbar {
		display: none;
	}

	h1 {
		font-size: 5rem;
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: -0.02em;
	}

	@media screen and (max-width: 768px) {
		h1 {
			font-size: 2rem !important;
		}
	}

	p {
		font-size: 18px;
		font-weight: 400;
		line-height: 1.5;
		width: 50%;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.header {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		width: 100%;
		z-index: 2;
	}

	.letters {
		flex: 1;
		display: flex;
		text-transform: uppercase;
	}

	.letters > div {
		flex: 1;
		font-size: 17vw;
		font-weight: 400;
		color: #000;
		text-align: center;
	}

	.website-content {
		position: fixed;
		top: 0;
		width: 100%;
		min-height: 100vh;
	}

	.img-holder {
		position: relative;
		top: 0;
		width: 100%;
		height: 100vh;
		background: #fff;
		clip-path: polygon(37.5% 20%, 62.5% 20%, 62.5% 80%, 37.5% 80%);
		transform: rotate(30deg);
	}

	.img-holder img {
		position: relative;
		transform: scale(2);
	}

	.content-holder {
		position: relative;
		top: -5px;
		width: 100%;
		background: #000;
		color: #fff;
		padding: 1em;
		height: 100vh;
	}

	.row {
		margin: 2em 1em;
	}

	.img {
		width: 200px;
		height: 275px;
	}

	.row:nth-child(2) .img {
		position: relative;
		left: 50%;
	}

	.row:nth-child(3) .img {
		position: relative;
		left: 15%;
	}

	.row:nth-child(4) .img {
		position: relative;
		left: 70%;
	}

	.row:nth-child(6) p {
		position: relative;
		left: 30%;
		margin: 4em 0;
	}
</style>
