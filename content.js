'use strict'

const TRS_CLASS = 'classroom-transcript'

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
    let trs = document.getElementsByClassName(TRS_CLASS)[0]
    return trs ? trs.innerText : false
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
    let base_name = sanitiseTitle(_ts + '__' + document.title)
    let vid = parseVideo(document)
    let trs = parseTranscript(document)
    let vid_name = base_name + '.mp4'
    let video_params = { filename: vid_name, url: vid.src }
    console.log('Fetch video:', video_params)
    browser.runtime.sendMessage(video_params)
    if (trs) {
        let trs_name = base_name + '.txt'
        let trs_params = { action: 'build', filename: trs_name, contents: trs }
        console.log('Fetch transcript:', trs_params)
        browser.runtime.sendMessage(trs_params)
    }
}

browser.runtime.onMessage.addListener(getVideoUrl)
