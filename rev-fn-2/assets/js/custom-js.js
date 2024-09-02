// Words count
document.addEventListener('DOMContentLoaded', function() {
  const postContent = document.getElementById('post-content');

  const text = postContent.innerText || postContent.textContent;
  const words = text.split(/\s+/).filter(word => word.length > 0).length;

  const wordsPerMinute = 200;
  const readingTime = Math.ceil(words / wordsPerMinute);

  const readingInfo = `
    <p class="reading-info"><i class="bi bi-book"></i> ${words} kata • <i class="bi bi-eye"></i> estimasi membaca ${readingTime} menit</p>`;

  const authorInfo = postContent.querySelector('.reading-info'); // Atur selektor jika perlu
  if (authorInfo) {
    authorInfo.insertAdjacentHTML('afterend', readingInfo);
  } else {
    postContent.insertAdjacentHTML('beforeend', readingInfo);
  }
});
