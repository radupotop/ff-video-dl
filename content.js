'use strict'

function hasVideo() {
    return !!document.getElementsByTagName('video').length
}

function sanitiseTitle(title) {
    return String(title).replace(/[^\w\s\.-]/g, '')
}

function parseVideo(document) {
    return document.getElementsByTagName('video')[0]
}

function parseTranscript(document) {
    return document.getElementsByClassName('classroom-transcript')[0].innerText
}

function getVideoUrl(msg) {
    if (msg.action !== 'getURL') {
        return
    }
    if (!hasVideo()) {
        console.log('No video detected')
        return
    }
    let _ts = Date.now()
    let vid = parseVideo(document)
    let trs = parseTranscript(document)
    let vid_name = sanitiseTitle(_ts + '__' + document.title)
    let trs_name = vid_name + '.txt'
    let video_params = { filename: vid_name, url: vid.src }
    let trs_params = { action: 'build', filename: trs_name, contents: trs }
    console.log('Fetch video:', video_params)
    browser.runtime.sendMessage(video_params)
    console.log('Fetch transcript:', trs_params)
    browser.runtime.sendMessage(trs_params)
}

browser.runtime.onMessage.addListener(getVideoUrl)
