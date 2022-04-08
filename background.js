'use strict'

function tabHandler(tab) {
    browser.tabs.sendMessage(tab.id, { action: 'getURL' })
}

function downloadFile(params) {
    console.log('Downloading:', params)
    browser.downloads.download(params)
}

browser.pageAction.onClicked.addListener(tabHandler)
browser.runtime.onMessage.addListener(downloadFile)
