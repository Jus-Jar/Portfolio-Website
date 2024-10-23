const observer = new MutationObserver(function(mutationsList, observer) {
  const form = document.querySelector('#contactForm');
  const senderName = document.getElementById('senderName');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');
  
  if (form) {  // When the form is added to the DOM
      observer.disconnect(); // Stop observing once the form is found

      form.addEventListener("submit", (e) => {
          e.preventDefault();
          sendEmail();
      });
  }
});

// Observe changes in the entire document body
observer.observe(document.body, { childList: true, subtree: true });

function sendEmail() {

  Email.send({
      Host: "smtp.elasticemail.com",
      Username: "jaredheeralalmail@gmail.com",
      Password: "ED190D35B21B09CD748F6543DDA23BA610A4",
      To: 'jaredheeralalmail@gmail.com',
      From: "jaredheeralalmail@gmail.com",
      Subject: subject.value,
      Body: `Sender Name: ${senderName.value} <br> Sender Email: ${email.value} <br> Message: ${message.value} <br>`
  }).then(
    message => {
      showToast('success', 'Email sent successfully!');
      document.getElementById('contactForm').reset(); // Reset the form
      }  
  ).catch(
      error => showToast('error', 'Failed to send email!')  // Error case
  );
}

function showToast(type, message) {
  var toast = document.getElementById("toast");
  toast.textContent = message;

  if (type === 'success') {
      toast.style.backgroundColor = "#4CAF50";  // Green for success
  } else if (type === 'error') {
      toast.style.backgroundColor = "#f44336";  // Red for error
  }

  toast.classList.add("show");

  setTimeout(function(){
      toast.classList.remove("show");
  }, 3000);
}
