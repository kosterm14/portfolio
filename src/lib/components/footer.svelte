<script>
	import { enhance } from '$app/forms';

	export let form;

	let loading = false;

	function handleForm() {
		loading = true;

		return async ({ result, update }) => {
			// fake api post
			await setTimeout(() => {
				update();

				loading = false;
			}, 1000);
		};
	}
</script>

<div class="popover-container">
	<button popovertarget="footer-popover" class="footer-button">Leave a Message</button>
	<div popover id="footer-popover" class="popover">
		<form method="POST" action="/" use:enhance={handleForm}>
			{#if form?.error}
				<p class="message fail">{form.message}</p>
			{/if}

			<fieldset>
				<h1>Leave a message:)</h1>
				<legend>Gegevens</legend>
				<label for="name">Name</label>
				<input type="text" required name="name" id="name" />

				<label for="email">Email</label>
				<input type="email" required name="email" id="email" />

				<legend>Opdracht</legend>
				<label for="text">Message</label>
				<textarea name="text" required id="text"></textarea>

				<button type="submit">Submit</button>
				{#if loading}
					<svg
						class="loader"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<style>
							.spinner_qM83 {
								animation: spinner_8HQG 0.5s infinite;
								fill: #007bff;
							}
							.spinner_oXPr {
								animation-delay: 0.1s;
							}
							.spinner_ZTLf {
								animation-delay: 0.2s;
							}
							@keyframes spinner_8HQG {
								0%,
								57.14% {
									animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
									transform: translate(0);
								}
								28.57% {
									animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
									transform: translateY(-6px);
								}
								100% {
									transform: translate(0);
								}
							}
						</style>
						<circle class="spinner_qM83" cx="4" cy="12" r="3" />
						<circle class="spinner_qM83 spinner_oXPr" cx="12" cy="12" r="3" />
						<circle class="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r="3" />
					</svg>
				{/if}

				{#if form?.success}
					<p class="message succes" class:active={form?.success}>
						Bedankt voor je bericht:)
					</p>
				{/if}
			</fieldset>
		</form>
	</div>
</div>

<style>
	.footer-button {
		position: fixed;
		right: 20px;
		bottom: 20px;
		padding: 10px 20px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.footer-button:hover {
		background-color: #0056b3;
	}

	.popover {
		border-radius: 5px;
		border-width: 1px;
		left: auto;
		bottom: auto;
		translate: -20px 120%;
	}

	.popover-container {
		position: relative;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		background-color: #f8f8f8;
		border-radius: 8px;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
	}

	fieldset {
		border: none;
		width: 100%;
		max-width: 500px;
	}

	h1 {
		text-align: center;
		margin-bottom: 1rem;
	}

	legend {
		display: none;
	}

	label {
		display: block;
		margin-top: 10px;
		font-weight: 600;
	}

	input,
	textarea {
		width: 100%;
		padding: 10px;
		margin-top: 5px;
		border-radius: 4px;
		border: 1px solid #ccc;
	}

	button {
		margin-top: 10px;
		padding: 10px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #0056b3;
	}
</style>
