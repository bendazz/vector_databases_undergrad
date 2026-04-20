const form = document.getElementById('embed-form');
const input = document.getElementById('text-input');
const result = document.getElementById('result');
const meta = document.getElementById('meta');
const vectorEl = document.getElementById('vector');
const button = form.querySelector('button');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    button.disabled = true;
    button.textContent = 'Embedding...';
    result.hidden = true;

    try {
        const res = await fetch(`/embed?text=${encodeURIComponent(text)}`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const vector = await res.json();

        meta.textContent = `Dimension: ${vector.length}`;
        vectorEl.textContent = '[' + vector.map(v => v.toFixed(6)).join(', ') + ']';
        result.hidden = false;
    } catch (err) {
        meta.textContent = 'Error';
        vectorEl.textContent = err.message;
        result.hidden = false;
    } finally {
        button.disabled = false;
        button.textContent = 'Embed';
    }
});
