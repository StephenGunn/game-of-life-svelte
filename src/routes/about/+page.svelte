<article>
	<h1>Hasn't this been done before?</h1>
	<div>
		<p>Yes, a ton of times.</p>
		<p>
			I had youtube on in the background the other day and I heard <a
				href="https://twitter.com/ThePrimeagen"
				target="_blank"
				rel="noopener noreferrer">The Primeagen</a
			> say something along the lines of "I've never built the game of life... maybe I should do that."
		</p>
		<p>I said to myself "Hey! I've been wanting to do that too!"</p>
		<p>So I did.</p>
		<h2>A few of my goals:</h2>
		<ul>
			<li>
				No dependencies past the SvelteKit skeleton project selections (typescript + prettier)
			</li>
			<li>Utilize Svelte's features (components, derived stores, etc)</li>
			<li>Make it interactive (you can draw on the game board to change the state live!)</li>
			<li>A fluid game board / clean responsive design</li>
			<li>Has to run well enough</li>
			<li>Didn't want to use canvas or any rendering libraries</li>
			<li>No type-os on this page (it's late)</li>
		</ul>
		<p>
			If you like my effort, give me a star on <a
				href="https://github.com/StephenGunn/game-of-life-svelte"
				target="_blank"
				rel="noopener noreferrer">GitHub</a
			> :)
		</p>
	</div>
</article>

<style>
	h1 {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 1rem;
		color: var(--secondary);
		margin-bottom: 2rem;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: bold;
		margin-bottom: 1rem;
		color: var(--secondary);
		margin-bottom: 0;
	}
	article {
		padding: 2rem;
		max-width: 800px;
		width: 100%;
		margin: 0 auto;
	}

	article > div {
		display: flex;
		flex-flow: column;
		gap: 2rem;
	}
	ul {
		margin-left: 1rem;
	}
	li::marker {
		color: var(--secondary);
	}
	ul li {
		padding: 1rem;
	}
</style>
