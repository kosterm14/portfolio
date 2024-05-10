<script>
    import { onMount, onDestroy } from 'svelte';

    export let startText = '';
    export let endText = '';
    let currentText = Array.from(startText);
    const targetText = Array.from(endText);
    let intervals = [];

    function startAnimation() {
        currentText.forEach((_, index) => {
            intervals[index] = setInterval(() => {
                // Get the current and target character ASCII values
                let currentCharCode = currentText[index].charCodeAt(0);
                let targetCharCode = targetText[index].charCodeAt(0);
                if (currentCharCode < targetCharCode) {
                    currentText[index] = String.fromCharCode(currentCharCode + 1);
                } else if (currentCharCode > targetCharCode) {
                    currentText[index] = String.fromCharCode(currentCharCode - 1);
                } else {
                    clearInterval(intervals[index]);
                }
                currentText = currentText.slice(); // Trigger reactivity
            }, 25 * (index + 1)); // Staggered timing
        });
    }

    onMount(() => {
        startAnimation();
    });

    onDestroy(() => {
        intervals.forEach(clearInterval); // Clear all intervals on destroy
    });
</script>

<h1>{@html currentText.join('')}</h1>

<style>
    h1 {
        flex: 1;
		font-size: 17vw;
		font-weight: 400;
		color: #000;
		text-align: center;
    }
</style>
