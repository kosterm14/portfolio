<script>
	let images = ['img.webp'];
	let repetitions = 10;

	import { onMount } from 'svelte';

	onMount(() => {
		const username = 'kosterm14';
		const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=50`;

		fetch(apiUrl)
			.then((response) => response.json())
			.then((repos) => {
				repos = repos.map((repo) => {
					return {
						...repo,
						name: repo.name.replace(/-/g, ' ')
					};
				});
				repos = repos.filter((repo) => repo.stargazers_count > 0);
				repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

				const container = document.getElementById('repos-container');
				repos.forEach((repo) => {
					const repository = document.createElement('div');
					repository.className = 'repository';
					repository.innerHTML = `
          	<h2>
				<a href="${repo.html_url}" target="_blank">${repo.name}</a>
			</h2>

		  	<p>
				<a href="${repo.homepage}" target="_blank">${repo.homepage || 'no link:('}</a>
			</p>

          	<p>${repo.description || 'No description available.'}</p>

          <section>⭐ ${repo.stargazers_count} | 👁️ ${repo.watchers_count} | 🍴 ${repo.forks_count}</section>
          `;
					container.appendChild(repository);
				});
			})
			.catch((error) => console.error('Error fetching repos:', error));
	});
</script>

<section class="grid">
	{#each Array(repetitions) as _, i (i)}
		{#each images as image (image)}
			<div class="img">
				<button>
					<img src={image} alt={`Image ${image}`} />
				</button>
			</div>
		{/each}
	{/each}
</section>

<section class="other">
	<h1>Alle repo's</h1>

	<nav>
		<input
			class="searchbar"
			type="text"
			id="searchInput"
			onkeyup="search()"
			placeholder="Zoek een repo..."
		/>
	</nav>

	<ul id="repos-container"></ul>
</section>

<style>
	:root {
		--images-per-row: 5;
	}

	@media screen and (max-width: 768px) {
		:root {
			--images-per-row: 1;
		}
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
		margin: 0;
	}

	.grid {
		perspective: 10000px;
		perspective-origin: center;
		transform-style: preserve-3d;
		display: grid;
		grid-template-columns: repeat(var(--images-per-row), 1fr);
		height: fit-content;
		margin-bottom: 30rem;
	}

	.grid .img:hover {
		transform: scale(1.05) translateZ(100px);
		filter: saturate(0.5);
	}

	.grid .img {
		position: relative;
		opacity: 0.5;
		filter: saturate(0);
		transition:
			scale 0.4s 0.05s ease-out,
			rotate 0.4s 0.05s ease-out;
	}

	.grid .img:focus-within {
		z-index: 2;
		transform: scale(1.2) !important;
		animation: animate 0.6s cubic-bezier(0.5, 0, 0.2, 1) forwards;
	}

	.grid .img button {
		background: none;
		border: none;
		padding: 0.5rem;
		cursor: pointer;
	}

	.grid .img button:focus {
		outline: none;
	}

	img {
		display: block;
		width: 100%;
		aspect-ratio: 5/5;
		object-fit: cover;
	}

	.other h1 {
		margin-bottom: 1rem;
	}

	.other nav {
		margin-bottom: 3rem;
	}

	.other {
		font-family: Arial, sans-serif;
		background: rgb(67, 67, 67);
		color: #333;
		padding: 1.25rem;
		margin: 0;
		padding-bottom: 10rem;
	}

	.other h1 {
		margin-bottom: 2rem;
		color: white;
	}

	@keyframes animate {
		to {
			opacity: 1;
			filter: saturate(1);
		}
	}
</style>
