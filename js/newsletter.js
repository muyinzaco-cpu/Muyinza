(function () {
  // Swap in your real Formspree endpoint once you've created one — see the form's
  // action attribute in each page's <footer>. Until then this will fail with a 404,
  // and the form will show the "something went wrong" message below.
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.footer-newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = form.querySelector('input[type="email"]');
      var button = form.querySelector('button[type="submit"]');
      var originalButtonText = button.textContent;
      button.textContent = 'Signing up…';
      button.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            form.innerHTML = '<p class="newsletter-success">You\'re on the list — thanks for signing up.</p>';
          } else {
            throw new Error('Submission failed');
          }
        })
        .catch(function () {
          button.textContent = originalButtonText;
          button.disabled = false;
          var existingError = form.querySelector('.newsletter-error');
          if (!existingError) {
            var errorMsg = document.createElement('p');
            errorMsg.className = 'newsletter-error';
            errorMsg.textContent = 'Something went wrong — please try again.';
            form.appendChild(errorMsg);
          }
        });
    });
  });
})();
