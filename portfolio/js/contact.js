// Contact form validation
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const digitsOnly = /^\d+$/;

function setError(id, message) {
  document.getElementById(id).classList.toggle("invalid", message !== "");
  document.getElementById(id + "Err").textContent = message;
  return message === "";
}

function validate() {
  const v = id => document.getElementById(id).value.trim();
  const results = [
    setError("name", v("name") ? "" : "Enter your name."),
    setError("email", !v("email") ? "Enter your email address." : emailPattern.test(v("email")) ? "" : "Enter a valid email, like name@example.com."),
    setError("phone", !v("phone") ? "Enter your phone number." : digitsOnly.test(v("phone")) ? "" : "Use digits only, with no spaces, + or dashes."),
    setError("message", v("message") ? "" : "Enter your message.")
  ];
  return results.every(Boolean);
}

form.addEventListener("submit", e => {
  e.preventDefault();
  status.textContent = "";
  if (validate()) {
    status.textContent = "Message sent. Thank you, I will reply soon.";
    form.reset();
  }
});
["name", "email", "phone", "message"].forEach(id =>
  document.getElementById(id).addEventListener("input", () => setError(id, ""))
);
