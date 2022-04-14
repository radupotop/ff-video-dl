'use strict'

// Handlers
function tabHandler(tab) {
    console.log('Handling Tab', tab)
    browser.tabs.sendMessage(tab.id, { action: 'getURL' })
}

// Build the blob on the browser side otherwise downloading won't work.
function buildBlobURL(text_src) {
    let text_blob = new Blob([text_src], { type: 'text/plain' })
    return URL.createObjectURL(text_blob)
}

// Handle building of blob or direct downloading.
function downloadFile(args) {
    let params
    if (args.action === 'build') {
        params = {
            filename: args.filename,
            url: buildBlobURL(args.contents),
        }
    } else {
        params = args
    }
    console.log('Downloading:', params)
    return browser.downloads.download(params)
}

// Listeners

// Keyboard shortcut defined in manifest
browser.commands.onCommand.addListener(function (command) {
    if (command === 'download-video') {
        let activeTab = browser.tabs.query({ active: true, currentWindow: true })
        activeTab.then((tabList) => tabHandler(tabList[0]))
    }
})

// Listener for Clicks on address-bar icon
browser.pageAction.onClicked.addListener(tabHandler)

// Listener for messages sent from the content.js script
browser.runtime.onMessage.addListener(downloadFile)
