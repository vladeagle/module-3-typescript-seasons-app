import summer from './assets/icons/summer.svg'
import autumn from './assets/icons/autumn.svg'
import winter from './assets/icons/winter.svg'
import summerSound from './assets/sounds/summer.mp3'
import autumnSound from './assets/sounds/autumn.mp3'
import winterSound from './assets/sounds/winter.mp3'

export default [
  {
    id: 0,
    active: true,
    title: 'Лето',
    name: 'summer',
    audioSrc: summerSound,
    icon: summer,
  },
  {
    id: 1,
    active: false,
    title: 'Осень',
    name: 'autumn',
    audioSrc: autumnSound,
    icon: autumn,
  },
  {
    id: 2,
    active: false,
    title: 'Зима',
    name: 'winter',
    audioSrc: winterSound,
    icon: winter,
  },
]
