const form = document.getElementById('similarity-form');
const input1 = document.getElementById('text-input-1');
const input2 = document.getElementById('text-input-2');
const result = document.getElementById('result');
const meta = document.getElementById('meta');
const similarityEl = document.getElementById('similarity');
const button = form.querySelector('button');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text1 = input1.value.trim();
    const text2 = input2.value.trim();
    if (!text1 || !text2) return;

    button.disabled = true;
    button.textContent = 'Comparing...';
    result.hidden = true;

    try {
        const params = new URLSearchParams({ text1, text2 });
        const res = await fetch(`/similarity?${params}`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const similarity = await res.json();

        meta.textContent = 'Cosine similarity';
        similarityEl.textContent = similarity.toFixed(6);
        result.hidden = false;
    } catch (err) {
        meta.textContent = 'Error';
        similarityEl.textContent = err.message;
        result.hidden = false;
    } finally {
        button.disabled = false;
        button.textContent = 'Compare';
    }
});
