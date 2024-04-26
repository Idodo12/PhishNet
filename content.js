var keyWords = [
    "urgent", "calls", "paid", "need", "gift", "gifts", "cards", "card",
    "urgently", "response", "needed", "login", "expiring", "soon",
    "immediately", "free", "detect", "pay", "job", "access", "expire", "friend", "lowest",
    "price", "serious", "action", "database", "winner", "refund", "files", "activate",
    "activated", "wage", "vital", "irregular", "docs", "invited", "account", "employment",
    "notice", "service", "bcourse", "employee", "phone", "information", "dirks", "suspended"
  ];

let emailOpened = false;  

function printEmailContent() {
    if (!emailOpened) {
        emailOpened = true;  

        const emailBodies = document.querySelectorAll('div[role="listitem"] div[dir="ltr"]');

        if (emailBodies.length > 0) {
            console.log("Email Content:");
            emailBodies.forEach(body => {
                console.log(body.innerText);
                let keywordCount = keyWords.reduce((count, keyword) => {
                    let regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                    return count + (body.innerText.match(regex) ? body.innerText.match(regex).length : 0);
                }, 0);

                if (keywordCount >= 2) {
                    alert("Phishing detected!");
                }
            });
        } else {
            console.log("no email content found");
        }
    }
}

const observer = new MutationObserver((mutations, obs) => {
    const viewElement = document.querySelector('div[role="listitem"]');

    if (viewElement) {
        printEmailContent();
    } else {
        emailOpened = false;  
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
