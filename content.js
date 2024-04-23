document.addEventListener('DOMContentLoaded', () => {
    const unseenMails = document.querySelectorAll('.zF');
    console.log("Unseen Mails:");
    unseenMails.forEach(mail => console.log(mail.textContent));
  });
  