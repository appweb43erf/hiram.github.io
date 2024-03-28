document.addEventListener('DOMContentLoaded', function () {
    const backToLoginButton = document.querySelector('#backToLogin');
    if (backToLoginButton) {
      backToLoginButton.addEventListener('click', () => {
        // Redirige al usuario a la página de inicio de sesión
        window.location.href = "index.html";
      });
    }
  });
  