const keywords = ["label", "invoice", "post", "document", "postal", "calculations", "copy", "fedex", "statement", "financial", "dhl", "usps", "8", "notification", "n", "irs", "ups", "no", "delivery", "ticket"];

function printEmailContent() {
    const emailBodies = document.querySelectorAll('div[role="listitem"] div[dir="ltr"]');

    if (emailBodies.length > 0) {
        console.log("Email Content:");
        emailBodies.forEach(body => {
            // console.log(body.innerText); 
            if (keywords.some(keyword => body.innerText.includes(keyword))) {
                alert("Phishing detected!");
            }
        });
    } else {
        console.log("no email content found");
    }
}

const observer = new MutationObserver((mutations, obs) => {
    const viewElement = document.querySelector('div[role="listitem"]');

    if (viewElement) {
        printEmailContent();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
