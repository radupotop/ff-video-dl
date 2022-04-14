'use strict'

function hasVideo() {
    return !!document.getElementsByTagName('video').length
}

function sanitiseTitle(title) {
    return String(title).replace(/[^\w\s\.-]/g, '')
}

function getVideoUrl(msg) {
    if (msg.action !== 'getURL') {
        return
    }
    if (!hasVideo()) {
        console.log('No video detected')
        return
    }
    let vid = document.getElementsByTagName('video')[0]
    let ts = Date.now()
    let vid_name = sanitiseTitle(ts + '__' + document.title)
    let video_params = { filename: vid_name, url: vid.src }
    console.log('Fetch video:', video_params)
    browser.runtime.sendMessage(video_params)
}

browser.runtime.onMessage.addListener(getVideoUrl)
