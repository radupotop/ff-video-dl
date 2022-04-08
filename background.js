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
browser.commands.onCommand.addListener(function (command) {
    if (command === 'download-video') {
        let activeTab = browser.tabs.query({ active: true, currentWindow: true })
        activeTab.then((tabList) => tabHandler(tabList[0]))
    }
})

browser.pageAction.onClicked.addListener(tabHandler)
browser.runtime.onMessage.addListener(downloadFile)
