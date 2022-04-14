'use strict'

// Handlers
function tabHandler(tab) {
    console.log('Handling Tab', tab)
    browser.tabs.sendMessage(tab.id, { action: 'getURL' })
}

function downloadFile(params) {
    console.log('Downloading:', params)
    browser.downloads.download(params)
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
