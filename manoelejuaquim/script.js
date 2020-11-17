
const create_array = size => new Array(size).fill(0).map((_,k) => k + 1)

const create_img = image_src => `<img id="${image_src}" src="images/${image_src}.jpg" alt="">`

const set_class = (elm_id, class_name='') => document.getElementById(elm_id).className = class_name

const mount_changer = (images_group, images_limit) => {
  let next = 0
  const getnext = () => next + 1 > images_limit ? next = 1 : ++next
  const images_ids = create_array(images_limit)
    .map(image_id => `${images_group}_${image_id}`)
    
  const images = images_ids
    .map(image_id => create_img(image_id))
    .join('\n')
  document.getElementById(images_group).innerHTML = images

  return () => {
    const image_src = `${images_group}_${getnext()}`
    images_ids
      .map(id => set_class(id))
    set_class(image_src, 'show')
  }
}

const seconds = sec => sec * 1000

const initialize = (page, interval) => {
  page()
  setInterval(page, interval)
}

const main = () => {
  initialize(
    mount_changer('top', 8),
    seconds(10),
  )
  initialize(
    mount_changer('down', 4),
    seconds(20),
  )
}

document.addEventListener('DOMContentLoaded', main)
