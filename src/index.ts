import data from './data'
import './index.scss'
import { ISeasonItem } from './interfaces/season-item.interface'

const app = document.querySelector('#app')
const backgroundEl = document.querySelector('#background') as HTMLElement
const listEl = document.querySelector('#list')
const docTitle = document.title
const subtitle = document.querySelector('#subtitle')
const volumeInput = document.createElement('input')

volumeInput.type = 'range'
volumeInput.className = 'seasons-app__volume-input'
volumeInput.addEventListener('input', (event) => onVolumeChange(event))

function renderItem(item: ISeasonItem) {
  const audio = document.createElement('audio')
  const icon = document.createElement('img')
  const li = document.createElement('li')

  if (audio.canPlayType('audio/mpeg')) {
    audio.src = item.audioSrc
    audio.setAttribute('controls', 'true')
    audio.volume = 0.5
    item.audio = audio
  }

  icon.src = item.icon
  li.className = 'seasons-app__list-item'
  li.style.backgroundImage = `url(${`./assets/images/${item.name}-bg.jpg`})`
  li.addEventListener('click', () => onAudioPlaybackToggle(item))

  li.appendChild(audio)
  li.appendChild(icon)
  listEl.append(li)
  app.append(volumeInput)
}

function onAudioPlaybackToggle(item: ISeasonItem) {
  if (item.audio?.readyState !== 4) {
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
    item.audio.volume = Number(volumeInput.value) / 100

    const inactiveItems: ISeasonItem[] = data.filter((el) => el.id !== item.id)
    inactiveItems.forEach((oItem: ISeasonItem) => {
      oItem.active = false
      oItem.audio.currentTime = 0
      oItem.audio.pause()
    })
  }
}

function onVolumeChange(event: Event) {
  const activeItem: ISeasonItem = data.filter((el) => el.active)[0]
  activeItem.audio.volume =
    Number((event.currentTarget as HTMLInputElement).value) / 100
}

data.forEach(renderItem)
