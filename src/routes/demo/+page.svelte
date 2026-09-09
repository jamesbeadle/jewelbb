<script lang="ts">
	import { onMount } from 'svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';

	// ---------------------------------------------------------------------
	// /demo — scroll-driven "house from the ground up" concept.
	// Standalone route: nothing else on the site imports or links to it,
	// it is noindex'd, and it is not in the sitemap.
	// ---------------------------------------------------------------------

	const stages = [
		{
			id: 'intro',
			label: 'Before the first brick',
			kicker: 'From the ground up',
			title: 'A house is decided long before it is seen.',
			text: 'Scroll, and watch one take shape — from the trench to the front door.'
		},
		{
			id: 'ground',
			label: 'Groundworks',
			kicker: '01 · Groundworks',
			title: 'It begins below the lawn.',
			text: 'Footings set to the engineer’s depth, not the convenient one. Nobody will ever see this part — it is the part everything else depends on.'
		},
		{
			id: 'frame',
			label: 'Structure',
			kicker: '02 · Structure',
			title: 'The frame sets the character.',
			text: 'Oak, steel or timber — chosen for the house, not the schedule. Get the bones right and the rest follows.'
		},
		{
			id: 'walls',
			label: 'Envelope',
			kicker: '03 · Envelope',
			title: 'Brick, tile and the Surrey vernacular.',
			text: 'Handmade bricks below, hung clay tiles above. The weathering starts the day it goes up — that is the point.'
		},
		{
			id: 'roof',
			label: 'Roof',
			kicker: '04 · Roof',
			title: 'Weathertight before winter.',
			text: 'Clay tiles laid to a true line, lead where lead belongs. A roof you forget about is a roof done properly.'
		},
		{
			id: 'glazing',
			label: 'Glazing',
			kicker: '05 · Glazing',
			title: 'Light, let in on purpose.',
			text: 'Slim steel or painted timber. Sightlines checked from the kitchen table, not the drawing.'
		},
		{
			id: 'finishes',
			label: 'Finishes',
			kicker: '06 · Finishes',
			title: 'The last five per cent takes the longest.',
			text: 'Lime pointing. Lead flashing. A front door hung so it closes with a sound, not a slam.'
		},
		{
			id: 'garden',
			label: 'Landscape',
			kicker: '07 · Landscape',
			title: 'Then the garden grows around it.',
			text: 'Yew hedging, a gravel drive, lanterns lit for the first evening. Built to look as though it had always been there.'
		},
		{
			id: 'done',
			label: 'Complete',
			kicker: 'Complete',
			title: 'Quietly finished.',
			text: 'Every house we build goes through exactly this — in the right order, at the right pace, by people who will still be here when it is done.'
		}
	];

	// Where each stage starts, as a fraction of the scroll track.
	const cut = [0, 0.04, 0.2, 0.38, 0.5, 0.62, 0.72, 0.82, 0.95];

	let active = $state(0);
	let percent = $state(0);

	onMount(() => {
		const track = document.getElementById('build-track') as HTMLElement;
		const stage = document.getElementById('build-stage') as HTMLElement;
		const svg = document.getElementById('house') as unknown as SVGSVGElement;
		if (!track || !stage || !svg) return;

		const q = <T extends Element>(sel: string) => svg.querySelector(sel) as T | null;
		const qa = <T extends Element>(sel: string) => Array.from(svg.querySelectorAll(sel)) as T[];

		const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
		const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
		const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

		const layers = {
			sky: q<SVGGElement>('[data-layer="sky"]'),
			far: q<SVGGElement>('[data-layer="far"]'),
			back: q<SVGGElement>('[data-layer="back"]'),
			house: q<SVGGElement>('[data-layer="house"]'),
			land: q<SVGGElement>('[data-layer="land"]'),
			fore: q<SVGGElement>('[data-layer="fore"]')
		};

		const trench = qa<SVGPathElement>('[data-draw="trench"]');
		const footings = q<SVGGElement>('#footings');
		const cutaway = q<SVGGElement>('#cutaway');
		const frame = qa<SVGPathElement>('[data-draw="frame"]');
		const frameGroup = q<SVGGElement>('#frame');
		const wallWipe = q<SVGRectElement>('#wipe-walls-rect');
		const roofWipe = q<SVGRectElement>('#wipe-roof-rect');
		const windows = qa<SVGGElement>('[data-window]');
		const finishes = qa<SVGElement>('[data-finish]');
		const plants = qa<SVGElement>('[data-plant]');
		const lawn = q<SVGRectElement>('#lawn');
		const drive = q<SVGPolygonElement>('#drive');
		const dusk = q<SVGRectElement>('#dusk');
		const glows = qa<SVGRectElement>('[data-glow]');
		const stars = q<SVGGElement>('#stars');

		const set = (el: Element | null, name: string, value: string | number) => {
			if (el) (el as HTMLElement).style.setProperty(name, String(value));
		};

		function render(p: number) {
			// Stage bookkeeping ------------------------------------------------
			let i = 0;
			for (let k = 0; k < cut.length; k++) if (p >= cut[k]) i = k;
			active = i;
			percent = Math.round(seg(p, cut[1], cut[8]) * 100);

			// Parallax: layers drift at different rates; the whole scene eases
			// back very slightly, like a drone pulling away as the house grows.
			set(layers.sky, 'transform', `translateY(${-p * 28}px)`);
			set(layers.far, 'transform', `translateY(${-p * 46}px)`);
			set(layers.back, 'transform', `translateY(${-p * 18}px)`);
			set(layers.house, 'transform', `translateY(${-p * 10}px)`);
			set(layers.land, 'transform', `translateY(${p * 6}px)`);
			set(layers.fore, 'transform', `translateY(${p * 70}px)`);
			set(svg, 'transform', `scale(${1.06 - 0.06 * ease(p)})`);

			// 01 Groundworks ---------------------------------------------------
			const g = seg(p, cut[1], cut[2]);
			for (const el of trench) set(el, 'stroke-dashoffset', 1 - clamp(g * 1.4));
			set(footings, 'opacity', seg(g, 0.45, 1));
			set(cutaway, 'opacity', seg(p, cut[1] - 0.01, cut[1] + 0.05) * (1 - seg(p, cut[7], cut[7] + 0.06)));

			// 02 Structure -----------------------------------------------------
			const f = seg(p, cut[2], cut[3]);
			frame.forEach((el, n) => {
				const d = n / Math.max(1, frame.length - 1);
				set(el, 'stroke-dashoffset', 1 - seg(f, d * 0.45, d * 0.45 + 0.55));
			});
			set(frameGroup, 'opacity', 1 - 0.9 * seg(p, cut[4], cut[5]));

			// 03 Envelope (walls wipe upward from the ground) -------------------
			const w = ease(seg(p, cut[3], cut[4] + 0.04));
			if (wallWipe) {
				wallWipe.setAttribute('y', String(520 - 330 * w));
				wallWipe.setAttribute('height', String(330 * w));
			}

			// 04 Roof (wipe from eaves to chimney pots) -------------------------
			const r = ease(seg(p, cut[4], cut[5]));
			if (roofWipe) {
				roofWipe.setAttribute('y', String(350 - 230 * r));
				roofWipe.setAttribute('height', String(230 * r));
			}

			// 05 Glazing (staggered) -------------------------------------------
			windows.forEach((el, n) => {
				const a = cut[5] + n * 0.009;
				set(el, 'opacity', seg(p, a, a + 0.05));
			});

			// 06 Finishes (staggered) ------------------------------------------
			finishes.forEach((el, n) => {
				const a = cut[6] + n * 0.007;
				set(el, 'opacity', seg(p, a, a + 0.05));
			});

			// 07 Landscape -----------------------------------------------------
			set(lawn, 'opacity', seg(p, cut[7], cut[7] + 0.05));
			set(drive, 'opacity', seg(p, cut[7] + 0.02, cut[7] + 0.07));
			plants.forEach((el, n) => {
				const a = cut[7] + 0.02 + n * 0.012;
				const t = ease(seg(p, a, a + 0.06));
				set(el, 'transform', `scale(${0.2 + 0.8 * t})`);
				set(el, 'opacity', t);
			});
			const evening = seg(p, cut[7] + 0.06, cut[8] + 0.02);
			set(dusk, 'opacity', evening * 0.95);
			set(stars, 'opacity', 0.9 - 0.5 * evening);
			for (const el of glows) set(el, 'opacity', 0.6 * seg(p, cut[7] + 0.09, cut[8] + 0.03));
		}

		// Sticky offset: the site header stays on top, so the stage pins below it.
		const header = document.querySelector('header');
		const measure = () => {
			const h = header ? Math.round(header.getBoundingClientRect().height) : 0;
			track.style.setProperty('--hdr', `${h}px`);
			// Tighter crop on narrow screens so the house stays legible.
			const narrow = svg.getBoundingClientRect().width < 640;
			svg.setAttribute('viewBox', narrow ? '190 60 820 690' : '120 0 1110 720');
			svg.setAttribute('preserveAspectRatio', narrow ? 'xMidYMax meet' : 'xMidYMid meet');
		};

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) {
			measure();
			track.classList.add('build--static');
			render(1);
			return;
		}

		let last = -1;
		let ticking = false;
		const update = () => {
			ticking = false;
			const rect = track.getBoundingClientRect();
			const total = track.offsetHeight - stage.offsetHeight;
			const p = total > 0 ? clamp(-rect.top / total) : 1;
			if (p !== last) {
				last = p;
				render(p);
			}
		};
		const onScroll = () => {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(update);
			}
		};
		const onResize = () => {
			measure();
			last = -1;
			onScroll();
		};

		measure();
		render(0);
		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
		};
	});
</script>

<svelte:head>
	<title>Demo — From the ground up | Jewel Bespoke Build</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="description" content="Concept page — a house built stage by stage as you scroll." />
</svelte:head>

<!-- Scroll track: tall so the pinned stage has room to play through. -->
<section class="build" id="build-track">
	<div class="stage" id="build-stage">
		<!-- Copy panel ------------------------------------------------------- -->
		<div class="copy">
			<div class="copy__brand">
				<span class="copy__eyebrow">Jewel Bespoke Build</span>
				<span class="copy__rule"></span>
				<span class="copy__tag">Surrey · Est. 2021</span>
			</div>

			<div class="copy__slides">
				{#each stages as s, i (s.id)}
					<div class="slide" class:slide--active={active === i} aria-hidden={active !== i}>
						<span class="slide__kicker">{s.kicker}</span>
						<h2 class="slide__title">{s.title}</h2>
						<p class="slide__text">{s.text}</p>
						{#if i === stages.length - 1}
							<div class="slide__actions">
								<a href="/contact" class="btn btn--primary">Start a conversation</a>
								<a href="/portfolio" class="btn btn--ghost">View our work</a>
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<div class="counter" aria-live="off">
				<span class="counter__num">{percent}</span><span class="counter__pct">%</span>
				<span class="counter__label">complete</span>
			</div>
		</div>

		<!-- The house ---------------------------------------------------------- -->
		<div class="scene">
			<svg
				id="house"
				viewBox="120 0 1110 720"
				preserveAspectRatio="xMidYMid meet"
				role="img"
				aria-label="Illustration of a house being built stage by stage"
			>
				<defs>
					<linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0" stop-color="#12161f" />
						<stop offset="1" stop-color="#2a3040" />
					</linearGradient>
					<radialGradient id="dusk-grad" cx="0.5" cy="0.78" r="0.75">
						<stop offset="0" stop-color="#c09a51" stop-opacity="0.5" />
						<stop offset="0.55" stop-color="#8a5a2c" stop-opacity="0.18" />
						<stop offset="1" stop-color="#1a1e29" stop-opacity="0" />
					</radialGradient>
					<linearGradient id="glass-grad" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0" stop-color="#8fa9c2" />
						<stop offset="0.5" stop-color="#587188" />
						<stop offset="1" stop-color="#3f5468" />
					</linearGradient>
					<pattern id="brick" width="26" height="12" patternUnits="userSpaceOnUse">
						<rect width="26" height="12" fill="#8a5a41" />
						<rect x="0" y="0" width="12" height="5" fill="#96634a" />
						<rect x="14" y="0" width="12" height="5" fill="#8f5d44" />
						<rect x="7" y="6" width="12" height="5" fill="#93604a" />
						<rect x="-6" y="6" width="12" height="5" fill="#865640" />
						<rect x="20" y="6" width="12" height="5" fill="#865640" />
					</pattern>
					<pattern id="tilehang" width="20" height="12" patternUnits="userSpaceOnUse">
						<rect width="20" height="12" fill="#8d5843" />
						<path d="M0 6 a5 5 0 0 0 10 0 a5 5 0 0 0 10 0" fill="none" stroke="#6a3d2c" stroke-width="1.2" />
						<path d="M-5 12 a5 5 0 0 0 10 0 a5 5 0 0 0 10 0 a5 5 0 0 0 10 0" fill="none" stroke="#6a3d2c" stroke-width="1.2" />
					</pattern>
					<pattern id="rooftile" width="18" height="9" patternUnits="userSpaceOnUse">
						<rect width="18" height="9" fill="#4a3d38" />
						<path d="M0 4.5 H18 M9 0 V4.5 M0 4.5 V9 M18 4.5 V9" fill="none" stroke="#3a2f2b" stroke-width="1" />
					</pattern>
					<clipPath id="wipe-walls">
						<rect id="wipe-walls-rect" x="0" y="520" width="1200" height="0" />
					</clipPath>
					<clipPath id="wipe-roof">
						<rect id="wipe-roof-rect" x="0" y="350" width="1200" height="0" />
					</clipPath>
				</defs>

				<!-- Sky ---------------------------------------------------------- -->
				<g data-layer="sky">
					<rect x="-500" y="-500" width="2200" height="1700" fill="url(#sky-grad)" />
					<g id="stars" fill="#e9e2d6">
						<circle cx="120" cy="90" r="1.2" /><circle cx="260" cy="150" r="0.9" />
						<circle cx="410" cy="60" r="1.1" /><circle cx="560" cy="120" r="0.8" />
						<circle cx="700" cy="40" r="1.3" /><circle cx="820" cy="140" r="0.9" />
						<circle cx="960" cy="70" r="1.2" /><circle cx="1090" cy="160" r="0.8" />
						<circle cx="1150" cy="50" r="1" /><circle cx="330" cy="210" r="0.7" />
						<circle cx="880" cy="230" r="0.7" /><circle cx="40" cy="240" r="0.9" />
					</g>
					<rect id="dusk" x="-500" y="-500" width="2200" height="1700" fill="url(#dusk-grad)" opacity="0" />
				</g>

				<!-- Distant treeline ---------------------------------------------- -->
				<g data-layer="far" fill="#1c222b">
					<path
						d="M-100 540 L-100 500 C-40 470 20 455 70 470 C110 440 150 430 190 455 C230 420 280 425 320 455 C360 445 400 450 430 470 C470 440 520 435 560 465 C600 445 650 440 700 468 C740 438 790 430 830 462 C870 445 920 448 950 468 C990 440 1040 432 1080 462 C1120 450 1170 455 1220 480 C1260 470 1300 480 1300 540 Z"
					/>
				</g>

				<!-- Ground ---------------------------------------------------------- -->
				<g data-layer="ground">
					<rect x="-500" y="520" width="2200" height="700" fill="#1f2529" />
					<rect id="lawn" x="-500" y="520" width="2200" height="700" fill="#2b3f35" opacity="0" />
					<line x1="-500" y1="520" x2="1700" y2="520" stroke="#c09a51" stroke-opacity="0.45" stroke-width="1" />
				</g>

				<!-- Trees behind the house ------------------------------------------ -->
				<g data-layer="back">
					<g data-plant class="plant" opacity="0">
						<rect x="218" y="380" width="14" height="140" fill="#2a2321" />
						<circle cx="225" cy="352" r="82" fill="#24382f" />
						<circle cx="180" cy="392" r="48" fill="#1f3129" />
						<circle cx="268" cy="392" r="44" fill="#1f3129" />
					</g>
					<g data-plant class="plant" opacity="0">
						<rect x="968" y="390" width="14" height="130" fill="#2a2321" />
						<circle cx="975" cy="366" r="76" fill="#24382f" />
						<circle cx="934" cy="400" r="44" fill="#1f3129" />
						<circle cx="1018" cy="402" r="44" fill="#1f3129" />
					</g>
				</g>

				<!-- House ---------------------------------------------------------- -->
				<g data-layer="house">
					<!-- 01 · Groundworks: cut-away below the lawn -->
					<g id="cutaway" opacity="0">
						<rect x="226" y="521" width="748" height="90" fill="#2c2621" />
						<path
							data-draw="trench"
							pathLength="1"
							d="M226 521 V611 H974 V521"
							fill="none"
							stroke="#c09a51"
							stroke-width="1.5"
							stroke-dasharray="1"
							stroke-dashoffset="1"
						/>
						<path
							data-draw="trench"
							pathLength="1"
							d="M250 521 V538 H950 V521 M236 538 H296 V568 H236 Z M420 538 H480 V568 H420 Z M720 538 H780 V568 H720 Z M904 538 H964 V568 H904 Z"
							fill="none"
							stroke="#c09a51"
							stroke-width="1.5"
							stroke-dasharray="1"
							stroke-dashoffset="1"
						/>
						<g id="footings" fill="#8c8577" opacity="0">
							<rect x="250" y="521" width="700" height="17" />
							<rect x="236" y="538" width="60" height="30" />
							<rect x="420" y="538" width="60" height="30" />
							<rect x="720" y="538" width="60" height="30" />
							<rect x="904" y="538" width="60" height="30" />
						</g>
					</g>

					<!-- 02 · Structure: the frame draws itself -->
					<g id="frame" fill="none" stroke="#c09a51" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path data-draw="frame" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M250 520 H950" />
						<path data-draw="frame" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M250 520 V330 M450 520 V330 M750 520 V330 M950 520 V330" />
						<path data-draw="frame" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M250 400 H950" />
						<path data-draw="frame" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M460 520 V300 M490 520 V300 M520 520 V300 M550 520 V300 M580 520 V300 M610 520 V300 M640 520 V300 M670 520 V300 M700 520 V300 M730 520 V300" />
						<path data-draw="frame" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M262 520 V314 M292 520 V275 M322 520 V236 M352 520 V203 M382 520 V242 M412 520 V281 M442 520 V320" />
						<path data-draw="frame" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M762 520 V314 M792 520 V275 M822 520 V236 M852 520 V203 M882 520 V242 M912 520 V281 M942 520 V320" />
						<path data-draw="frame" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M450 300 H750" />
						<path data-draw="frame" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M250 330 L350 200 L450 330 M300 265 H400" />
						<path data-draw="frame" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M750 330 L850 200 L950 330 M800 265 H900" />
						<path data-draw="frame" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M432 302 L540 205 H660 L768 302" />
						<path data-draw="frame" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M470 302 L554 205 M520 302 L571 205 M570 302 L589 205 M620 302 L607 205 M670 302 L625 205 M720 302 L643 205" />
					</g>

					<!-- 04 · Chimneys sit behind the gables, revealed with the roof -->
					<g clip-path="url(#wipe-roof)">
						<g fill="#7a4d38">
							<rect x="328" y="142" width="44" height="72" />
							<rect x="828" y="142" width="44" height="72" />
							<rect x="324" y="150" width="52" height="8" fill="#d9cfb8" />
							<rect x="824" y="150" width="52" height="8" fill="#d9cfb8" />
						</g>
						<g fill="#5a4038">
							<rect x="334" y="128" width="10" height="16" rx="2" />
							<rect x="356" y="128" width="10" height="16" rx="2" />
							<rect x="834" y="128" width="10" height="16" rx="2" />
							<rect x="856" y="128" width="10" height="16" rx="2" />
						</g>
					</g>

					<!-- 03 · Envelope: brick below, hung tile above -->
					<g clip-path="url(#wipe-walls)">
						<!-- central block -->
						<rect x="450" y="400" width="300" height="120" fill="url(#brick)" />
						<rect x="450" y="300" width="300" height="100" fill="url(#tilehang)" />
						<!-- left wing -->
						<rect x="250" y="400" width="200" height="120" fill="url(#brick)" />
						<polygon points="250,400 250,330 350,200 450,330 450,400" fill="url(#tilehang)" />
						<!-- right wing -->
						<rect x="750" y="400" width="200" height="120" fill="url(#brick)" />
						<polygon points="750,400 750,330 850,200 950,330 950,400" fill="url(#tilehang)" />
						<!-- plinth -->
						<rect x="250" y="506" width="700" height="14" fill="#6f5a4b" />
						<!-- corner quoins -->
						<g fill="#d9cfb8" opacity="0.9">
							<rect x="250" y="400" width="6" height="106" /><rect x="444" y="400" width="6" height="106" />
							<rect x="750" y="400" width="6" height="106" /><rect x="944" y="400" width="6" height="106" />
						</g>
					</g>

					<!-- 04 · Roof -->
					<g clip-path="url(#wipe-roof)">
						<polygon points="432,302 540,205 660,205 768,302" fill="url(#rooftile)" />
						<path d="M432 302 L540 205 H660 L768 302" fill="none" stroke="#2d2523" stroke-width="2" />
						<path d="M540 205 H660" stroke="#6d5a52" stroke-width="5" stroke-linecap="round" />
						<!-- bargeboards on the gables -->
						<path d="M236 344 L350 194 L464 344" fill="none" stroke="#e9e2d6" stroke-width="6" stroke-linejoin="round" />
						<path d="M736 344 L850 194 L964 344" fill="none" stroke="#e9e2d6" stroke-width="6" stroke-linejoin="round" />
						<!-- fascia + gutter on the central eaves -->
						<rect x="428" y="298" width="344" height="7" fill="#e9e2d6" />
					</g>

					<!-- 05 · Glazing -->
					<g id="glazing">
						<!-- left wing, ground floor -->
						<g data-window opacity="0">
							<rect x="288" y="412" width="124" height="90" fill="#e9e2d6" />
							<rect x="294" y="418" width="112" height="78" fill="url(#glass-grad)" />
							<path d="M330 418 V496 M370 418 V496 M294 448 H406" stroke="#e9e2d6" stroke-width="3" />
							<rect data-glow x="294" y="418" width="112" height="78" fill="#f2c66d" opacity="0" />
						</g>
						<!-- right wing, ground floor -->
						<g data-window opacity="0">
							<rect x="788" y="412" width="124" height="90" fill="#e9e2d6" />
							<rect x="794" y="418" width="112" height="78" fill="url(#glass-grad)" />
							<path d="M830 418 V496 M870 418 V496 M794 448 H906" stroke="#e9e2d6" stroke-width="3" />
							<rect data-glow x="794" y="418" width="112" height="78" fill="#f2c66d" opacity="0" />
						</g>
						<!-- central, ground floor -->
						<g data-window opacity="0">
							<rect x="468" y="412" width="74" height="90" fill="#e9e2d6" />
							<rect x="474" y="418" width="62" height="78" fill="url(#glass-grad)" />
							<path d="M505 418 V496 M474 448 H536" stroke="#e9e2d6" stroke-width="3" />
							<rect data-glow x="474" y="418" width="62" height="78" fill="#f2c66d" opacity="0" />
						</g>
						<g data-window opacity="0">
							<rect x="658" y="412" width="74" height="90" fill="#e9e2d6" />
							<rect x="664" y="418" width="62" height="78" fill="url(#glass-grad)" />
							<path d="M695 418 V496 M664 448 H726" stroke="#e9e2d6" stroke-width="3" />
							<rect data-glow x="664" y="418" width="62" height="78" fill="#f2c66d" opacity="0" />
						</g>
						<!-- first floor, central -->
						<g data-window opacity="0">
							<rect x="468" y="316" width="74" height="66" fill="#e9e2d6" />
							<rect x="474" y="322" width="62" height="54" fill="url(#glass-grad)" />
							<path d="M505 322 V376 M474 349 H536" stroke="#e9e2d6" stroke-width="3" />
							<rect data-glow x="474" y="322" width="62" height="54" fill="#f2c66d" opacity="0" />
						</g>
						<g data-window opacity="0">
							<rect x="563" y="316" width="74" height="66" fill="#e9e2d6" />
							<rect x="569" y="322" width="62" height="54" fill="url(#glass-grad)" />
							<path d="M600 322 V376 M569 349 H631" stroke="#e9e2d6" stroke-width="3" />
							<rect data-glow x="569" y="322" width="62" height="54" fill="#f2c66d" opacity="0" />
						</g>
						<g data-window opacity="0">
							<rect x="658" y="316" width="74" height="66" fill="#e9e2d6" />
							<rect x="664" y="322" width="62" height="54" fill="url(#glass-grad)" />
							<path d="M695 322 V376 M664 349 H726" stroke="#e9e2d6" stroke-width="3" />
							<rect data-glow x="664" y="322" width="62" height="54" fill="#f2c66d" opacity="0" />
						</g>
						<!-- first floor, wings -->
						<g data-window opacity="0">
							<rect x="306" y="268" width="88" height="70" fill="#e9e2d6" />
							<rect x="312" y="274" width="76" height="58" fill="url(#glass-grad)" />
							<path d="M350 274 V332 M312 303 H388" stroke="#e9e2d6" stroke-width="3" />
							<rect data-glow x="312" y="274" width="76" height="58" fill="#f2c66d" opacity="0" />
						</g>
						<g data-window opacity="0">
							<rect x="806" y="268" width="88" height="70" fill="#e9e2d6" />
							<rect x="812" y="274" width="76" height="58" fill="url(#glass-grad)" />
							<path d="M850 274 V332 M812 303 H888" stroke="#e9e2d6" stroke-width="3" />
							<rect data-glow x="812" y="274" width="76" height="58" fill="#f2c66d" opacity="0" />
						</g>
					</g>

					<!-- 06 · Finishes -->
					<g id="finishes">
						<!-- string course between floors -->
						<rect data-finish x="250" y="398" width="700" height="5" fill="#d9cfb8" opacity="0" />
						<!-- sills -->
						<g data-finish fill="#d9cfb8" opacity="0">
							<rect x="284" y="502" width="132" height="5" /><rect x="784" y="502" width="132" height="5" />
							<rect x="464" y="502" width="82" height="5" /><rect x="654" y="502" width="82" height="5" />
							<rect x="464" y="382" width="82" height="5" /><rect x="559" y="382" width="82" height="5" /><rect x="654" y="382" width="82" height="5" />
							<rect x="302" y="338" width="96" height="5" /><rect x="802" y="338" width="96" height="5" />
						</g>
						<!-- front door + porch -->
						<g data-finish opacity="0">
							<rect x="568" y="424" width="64" height="96" fill="#e9e2d6" />
							<rect x="573" y="429" width="54" height="91" fill="#2f3f3a" />
							<rect x="579" y="437" width="18" height="30" fill="none" stroke="#1f2a27" stroke-width="2" />
							<rect x="603" y="437" width="18" height="30" fill="none" stroke="#1f2a27" stroke-width="2" />
							<rect x="579" y="476" width="18" height="36" fill="none" stroke="#1f2a27" stroke-width="2" />
							<rect x="603" y="476" width="18" height="36" fill="none" stroke="#1f2a27" stroke-width="2" />
							<circle cx="618" cy="474" r="2.6" fill="#c09a51" />
							<rect x="560" y="516" width="80" height="6" fill="#bfb5a0" />
						</g>
						<g data-finish opacity="0">
							<path d="M548 426 L600 388 L652 426 Z" fill="#4a3d38" />
							<path d="M546 428 L600 386 L654 428" fill="none" stroke="#e9e2d6" stroke-width="5" stroke-linejoin="round" />
							<rect x="552" y="428" width="6" height="94" fill="#e9e2d6" />
							<rect x="642" y="428" width="6" height="94" fill="#e9e2d6" />
						</g>
						<!-- downpipes -->
						<g data-finish fill="#2d2523" opacity="0">
							<rect x="453" y="304" width="4" height="216" /><rect x="743" y="304" width="4" height="216" />
						</g>
						<!-- lanterns either side of the door -->
						<g data-finish opacity="0">
							<rect x="536" y="446" width="3" height="10" fill="#2d2523" />
							<rect x="531" y="454" width="13" height="16" rx="2" fill="none" stroke="#2d2523" stroke-width="2" />
							<rect data-glow x="533" y="456" width="9" height="12" fill="#f2c66d" opacity="0" />
							<rect x="661" y="446" width="3" height="10" fill="#2d2523" />
							<rect x="656" y="454" width="13" height="16" rx="2" fill="none" stroke="#2d2523" stroke-width="2" />
							<rect data-glow x="658" y="456" width="9" height="12" fill="#f2c66d" opacity="0" />
						</g>
						<!-- lead flashing at chimneys, ridge finials -->
						<g data-finish fill="#7c8189" opacity="0">
							<rect x="324" y="206" width="52" height="4" /><rect x="824" y="206" width="52" height="4" />
						</g>
					</g>
				</g>

				<!-- 07 · Landscape ---------------------------------------------------- -->
				<g data-layer="land">
					<polygon id="drive" points="572,522 628,522 690,1100 510,1100" fill="#4d4840" opacity="0" />
					<!-- yew hedging -->
					<rect data-plant class="plant" x="70" y="474" width="170" height="48" rx="22" fill="#2f4a3c" opacity="0" />
					<rect data-plant class="plant" x="960" y="474" width="170" height="48" rx="22" fill="#2f4a3c" opacity="0" />
					<!-- low box hedging along the frontage -->
					<rect data-plant class="plant" x="256" y="500" width="290" height="24" rx="12" fill="#35533f" opacity="0" />
					<rect data-plant class="plant" x="654" y="500" width="290" height="24" rx="12" fill="#35533f" opacity="0" />
					<!-- box balls either side of the drive -->
					<circle data-plant class="plant" cx="540" cy="540" r="20" fill="#3b5d47" opacity="0" />
					<circle data-plant class="plant" cx="660" cy="540" r="20" fill="#3b5d47" opacity="0" />
				</g>

				<!-- Foreground hedge, closest to the viewer ------------------------- -->
				<g data-layer="fore" fill="#10141a">
					<path
						d="M-500 1200 L-500 690 C-40 660 30 650 90 668 C150 640 220 645 270 670 C330 648 400 640 450 668 C520 645 600 640 650 668 C720 646 800 642 850 670 C920 646 990 642 1040 670 C1100 650 1180 648 1240 680 C1280 690 1300 700 1700 700 L1700 1200 Z"
					/>
				</g>
			</svg>
		</div>

		<!-- Stage rail ---------------------------------------------------------- -->
		<ol class="rail" aria-label="Build stages">
			{#each stages.slice(1, 8) as s, i (s.id)}
				<li class="rail__item" class:rail__item--active={active === i + 1} class:rail__item--done={active > i + 1}>
					<span class="rail__dot"></span>
					<span class="rail__label">{s.label}</span>
				</li>
			{/each}
		</ol>

		<div class="hint" class:hint--hidden={active > 0}>
			<span>Scroll</span>
			<span class="hint__line"></span>
		</div>
	</div>
</section>

<!-- About this demo ------------------------------------------------------- -->
<section class="section about">
	<div class="container about__grid">
		<div>
			<span class="kicker">About this page</span>
			<h2>A concept, not a finished thing.</h2>
		</div>
		<div class="about__text">
			<p class="lede">
				This is a working sketch of a scroll-driven build sequence for jewelbb.co.uk — the house
				assembles itself as you move down the page, in the order a real one would.
			</p>
			<p>
				The finished version would swap the illustration for photography from one of our own
				sites: the same elevation, captured at each stage from the same spot, so the house you
				scroll through is one we actually built. The mechanism stays exactly as it is here.
			</p>
		</div>
	</div>
</section>

<CtaBand />

<style>
	/* Track & pinned stage -------------------------------------------------- */
	.build {
		--hdr: 0px;
		--navy: #1a1e29;
		--gold: #c09a51;
		--orange: #ff8300;
		--cream: #e9e2d6;
		position: relative;
		height: 720vh;
		background: var(--navy);
		color: var(--cream);
	}

	.build:global(.build--static) {
		height: auto;
	}

	.stage {
		position: sticky;
		top: var(--hdr);
		height: calc(100dvh - var(--hdr));
		overflow: hidden;
		display: grid;
		grid-template-columns: minmax(300px, 34%) 1fr;
		background: var(--navy);
	}

	.build:global(.build--static) .stage {
		position: relative;
		min-height: 640px;
	}

	/* Scene ------------------------------------------------------------------ */
	.scene {
		position: relative;
		height: 100%;
		overflow: hidden;
	}

	.scene svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		transform-origin: 50% 70%;
		overflow: visible;
		will-change: transform;
	}

	.scene :global([data-layer]) {
		will-change: transform;
	}

	.plant {
		transform-box: fill-box;
		transform-origin: 50% 100%;
	}

	/* Copy panel ------------------------------------------------------------- */
	.copy {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: clamp(1.6rem, 4vw, 3.2rem);
		background: linear-gradient(90deg, var(--navy) 78%, rgba(26, 30, 41, 0));
		margin-right: -8%;
		pointer-events: none;
	}

	.copy :global(a) {
		pointer-events: auto;
	}

	.copy__brand {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	.copy__eyebrow {
		font-family: var(--font-display);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: var(--orange);
	}

	.copy__rule {
		width: 34px;
		height: 1px;
		background: var(--orange);
	}

	.copy__tag {
		font-family: var(--font-display);
		font-size: 0.66rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--gold);
	}

	.copy__slides {
		position: relative;
		flex: 1;
		display: grid;
		align-items: center;
		min-height: 0;
	}

	.slide {
		grid-area: 1 / 1;
		opacity: 0;
		transform: translateY(14px);
		transition:
			opacity 0.5s ease,
			transform 0.5s ease;
		max-width: 26rem;
	}

	.slide--active {
		opacity: 1;
		transform: none;
		transition-delay: 0.08s;
	}

	.slide__kicker {
		display: block;
		font-family: var(--font-display);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--gold);
		margin-bottom: 0.9rem;
	}

	.slide__title {
		color: #fff;
		font-size: clamp(1.5rem, 2.6vw, 2.25rem);
		font-weight: 500;
		line-height: 1.15;
		margin-bottom: 0.8rem;
	}

	.slide__text {
		color: rgba(233, 226, 214, 0.78);
		font-size: 1.02rem;
		line-height: 1.65;
		margin: 0;
	}

	.slide__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		margin-top: 1.5rem;
	}

	.btn--ghost {
		border-color: rgba(233, 226, 214, 0.45);
		color: var(--cream);
		background: transparent;
	}

	.btn--ghost:hover {
		border-color: var(--cream);
		background: rgba(233, 226, 214, 0.08);
	}

	.counter {
		display: flex;
		align-items: baseline;
		gap: 0.15rem;
		font-family: var(--font-display);
		color: var(--gold);
		font-variant-numeric: tabular-nums;
	}

	.counter__num {
		font-size: clamp(2.4rem, 4.4vw, 3.6rem);
		font-weight: 300;
		line-height: 1;
		min-width: 2ch;
		text-align: right;
	}

	.counter__pct {
		font-size: 1.2rem;
		font-weight: 300;
	}

	.counter__label {
		margin-left: 0.7rem;
		font-size: 0.68rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: rgba(233, 226, 214, 0.55);
	}

	/* Rail --------------------------------------------------------------------- */
	.rail {
		position: absolute;
		right: clamp(1rem, 3vw, 2.4rem);
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}

	.rail__item {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.7rem;
		font-family: var(--font-display);
		font-size: 0.66rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: rgba(233, 226, 214, 0.35);
		transition: color 0.4s ease;
	}

	.rail__item--done {
		color: rgba(233, 226, 214, 0.6);
	}

	.rail__item--active {
		color: var(--cream);
	}

	.rail__dot {
		width: 7px;
		height: 7px;
		transform: rotate(45deg);
		border: 1px solid rgba(233, 226, 214, 0.4);
		transition:
			background-color 0.4s ease,
			border-color 0.4s ease;
	}

	.rail__item--done .rail__dot {
		background: var(--gold);
		border-color: var(--gold);
	}

	.rail__item--active .rail__dot {
		background: var(--orange);
		border-color: var(--orange);
		box-shadow: 0 0 0 4px rgba(255, 131, 0, 0.18);
	}

	/* Scroll hint ------------------------------------------------------------- */
	.hint {
		position: absolute;
		left: 50%;
		bottom: 1.4rem;
		transform: translateX(-50%);
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-display);
		font-size: 0.62rem;
		letter-spacing: 0.26em;
		text-transform: uppercase;
		color: rgba(233, 226, 214, 0.6);
		transition: opacity 0.4s ease;
	}

	.hint--hidden {
		opacity: 0;
	}

	.hint__line {
		width: 1px;
		height: 34px;
		background: linear-gradient(180deg, var(--orange), transparent);
		animation: drop 1.8s ease-in-out infinite;
	}

	@keyframes drop {
		0% {
			transform: scaleY(0);
			transform-origin: top;
		}
		50% {
			transform: scaleY(1);
			transform-origin: top;
		}
		51% {
			transform-origin: bottom;
		}
		100% {
			transform: scaleY(0);
			transform-origin: bottom;
		}
	}

	/* About -------------------------------------------------------------------- */
	.about__grid {
		display: grid;
		gap: 1.5rem;
	}

	.about__text p:last-child {
		margin-bottom: 0;
		max-width: 46rem;
	}

	@media (min-width: 860px) {
		.about__grid {
			grid-template-columns: 1fr 1.6fr;
			gap: 3rem;
		}
	}

	/* Mobile: house on top, copy below ---------------------------------------- */
	@media (max-width: 860px) {
		.stage {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr auto;
		}

		.scene {
			order: 1;
		}

		.copy {
			order: 2;
			margin-right: 0;
			padding: 1.2rem 1.25rem 1.4rem;
			background: linear-gradient(0deg, var(--navy) 82%, rgba(26, 30, 41, 0));
			margin-top: -3.5rem;
			gap: 0.9rem;
		}

		.copy__brand {
			display: none;
		}

		.copy__slides {
			min-height: 13.5rem;
			align-items: end;
		}

		.slide__actions {
			margin-top: 1rem;
		}

		.slide__actions .btn {
			padding: 0.6rem 1.15rem;
			font-size: 0.86rem;
		}

		.slide__title {
			font-size: 1.4rem;
		}

		.slide__text {
			font-size: 0.94rem;
		}

		.counter__num {
			font-size: 2rem;
		}

		.rail {
			display: none;
		}

		.hint {
			bottom: auto;
			top: 1rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.slide,
		.hint__line {
			transition: none;
			animation: none;
		}
	}
</style>
