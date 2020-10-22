// content.js
const goToInitOpenSource = githubUrl => {
  const urlSplit = githubUrl.split('github.com/');
  const url = `https://init.me/open-src/${urlSplit.pop()}`;
  chrome.runtime.sendMessage({ "message": "open_new_tab", "url": url });
}

const githubUrl = window.location.href.match(/https:\/\/github\.com\/[^(\/|\s)]*\/[^(\/|\s)]*/)?.[0];
console.log('githubUrl', githubUrl)

if (githubUrl?.length) {
  let isPrivate = false;
  if ($('#js-repo-pjax-container > div.bg-gray-light.pt-3.hide-full-screen.mb-5 > div.d-flex.mb-3.px-3.px-md-4.px-lg-5 > div > h1 > span.Label.Label--outline.v-align-middle').length) {
    console.log($('#js-repo-pjax-container > div.bg-gray-light.pt-3.hide-full-screen.mb-5 > div.d-flex.mb-3.px-3.px-md-4.px-lg-5 > div > h1 > span.Label.Label--outline.v-align-middle').length)
    isPrivate = true;
  }
  console.log('isPrivate', isPrivate)

  if (!isPrivate) {
    const titleContainer = $('#js-repo-pjax-container > div.bg-gray-light.pt-3.hide-full-screen.mb-5 > div.d-flex.mb-3.px-3.px-md-4.px-lg-5 > div > h1');
    console.log('titleContainer', titleContainer)

    const button = document.createElement('a');
    button.className = "btn ml-2 d-none d-md-block";
    button.innerText = "Go to Docs"
    button.onclick = () => { goToInitOpenSource(githubUrl) }
    button.style = `
      background-color: var(--color-text-link-primary);
      color: #fafbfc;
      border-color: #fafbfc;
    `

    titleContainer.append(button);
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      if (githubUrl?.length) {
        goToInitOpenSource(githubUrl);
      } else {
        window.alert('This extension is only supported on Github');
      }
    }
  }
);
