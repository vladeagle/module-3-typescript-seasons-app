import data from './data'
import './index.scss'

const app = document.querySelector('#app')
const backgroundEl = document.querySelector('#background')
const listEl = document.querySelector('#list')
const docTitle = document.title
const subtitle = document.querySelector('#subtitle')
const volumeInput = document.createElement('input')

volumeInput.type = 'range'
volumeInput.className = 'seasons-app__volume-input'
volumeInput.addEventListener('input', (event) => onVolumeChange(event))

function renderItem(item) {
  const audio = document.createElement('audio')
  const icon = document.createElement('img')
  const li = document.createElement('li')

  if (audio.canPlayType('audio/mpeg')) {
    audio.src = `./assets/sounds/${item.name}.mp3`
    audio.setAttribute('controls', true)
    audio.volume = .5
    item.audio = audio
  }

  icon.src = `./assets/icons/${item.name}.svg`
  li.className = 'seasons-app__list-item'
  li.style.backgroundImage = `url(${`./assets/images/${item.name}-bg.jpg`})`
  li.addEventListener('click', () => onAudioPlaybackToggle(item))

  li.appendChild(audio)
  li.appendChild(icon)
  listEl.append(li)
  app.append(volumeInput)
}

function onAudioPlaybackToggle(item) {
  if (item.audio.readyState !== 4) {
    subtitle.innerHTML = 'Звук не готов'
    return
  }

  if (!item.audio.paused && item.audio.currentTime) {
    item.audio.pause()
    item.active = false
  } else {
    backgroundEl.style.backgroundImage = `url(${`./assets/images/${item.name}-bg.jpg`})`
    item.audio.play()
    item.active = true
    document.title = docTitle + ' | ' + item.title
    subtitle.innerHTML = item.title
    item.audio.volume = volumeInput.value / 100

    const inactiveItems = data.filter(el => el.id !== item.id)
    inactiveItems.forEach(oItem => {
      oItem.active = false
      oItem.audio.currentTime = 0
      oItem.audio.pause()
    })
  }
}

function onVolumeChange(event) {
  const activeItem = data.filter(el => el.active)[0]
  activeItem.audio.volume = event.currentTarget.value / 100
}

data.forEach(renderItem)
