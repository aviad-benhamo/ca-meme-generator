'use strict'

const SHARE_CONFIG = Object.freeze({
    enabled: false,
    cloudName: 'webify',
    uploadPreset: 'webify',
    disabledReason: 'Sharing is disabled in the public demo until a restricted Cloudinary preset is verified.'
})

// --- localStorage UTILS ---
function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

// --- RANDOM UTILS ---
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

// --- Cloudinary Upload ---
function getShareConfig() {
    return SHARE_CONFIG
}

async function uploadImg(imgData, onSuccess) {
    if (!SHARE_CONFIG.enabled) throw new Error(SHARE_CONFIG.disabledReason)

    const uploadUrl = `https://api.cloudinary.com/v1_1/${SHARE_CONFIG.cloudName}/image/upload`

    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', SHARE_CONFIG.uploadPreset)
    try {
        const res = await fetch(uploadUrl, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log('Cloudinary response:', data)
        onSuccess(data.secure_url)
    } catch (err) {
        console.error(err)
        throw err
    }
}

// --- Image Upload from Device ---
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        const img = new Image()
        img.onload = () => {
            onImageReady(img)
        }
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}
