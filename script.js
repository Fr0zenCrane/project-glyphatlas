'use strict';

const dialog = document.getElementById('figure-dialog');
const enlarged = document.getElementById('enlarged-figure');
let opener;

document.querySelectorAll('[data-figure]').forEach(link => {
  link.addEventListener('click', event => {
    if (typeof dialog.showModal !== 'function' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    enlarged.src = link.href;
    enlarged.alt = link.querySelector('img').alt;
    document.getElementById('figure-caption').textContent = link.dataset.caption;
    document.getElementById('original-figure').href = link.href;
    dialog.showModal();
    document.body.classList.add('dialog-open');
    document.getElementById('close-figure').focus();
  });
});

document.getElementById('close-figure').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  opener?.focus({ preventScroll: true });
});

const citation = document.getElementById('citation-bibtex');
const citationStatus = document.getElementById('citation-status');
document.getElementById('copy-citation').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(citation.textContent);
    citationStatus.textContent = 'Copied!';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(citation);
    selection.removeAllRanges();
    selection.addRange(range);
    citationStatus.textContent = 'BibTeX selected. Press Ctrl+C or ⌘C to copy.';
  }
});
