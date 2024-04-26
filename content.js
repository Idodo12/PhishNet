const { pipeline } = require("@huggingface/transformers");

let emailOpened = false;

async function isPhishing(content) {
    try {
        const model = "textattack/albert-base-v2-phishing-trec"; 
        const classifier = pipeline('zero-shot-classification', { model });
        const result = await classifier(content, ["phishing", "legitimate"]);
        return result[0].labels.includes("phishing");
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

function printEmailContent() {
    if (!emailOpened) {
        emailOpened = true
        
        const emailBodies = document.querySelectorAll('div[role="listitem"] div[dir="ltr"]');

        if (emailBodies.length > 0) {
            console.log("Email Content:");
            emailBodies.forEach(async body => {
                const content = body.innerText;
                const isPhishingContent = await isPhishing(content);
                if (isPhishingContent) {
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
