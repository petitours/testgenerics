
import { on } from 'anticore'

function parse (meta) {
  let [delay, href] = meta.getAttribute('content').split(';URL=')
  
  return {
    delay: delay - 1,
    href
  }
}

function defer (target, counter) {
  counter.interval = setInterval(countdown, 1000, target, counter)
}

function refresh (counter) {
  document.location = counter.href
}

function select (target) {
  return target.querySelector('#refresh-delay')
}

function countdown (target, counter) {
  if (!counter.delay) {
    clearInterval(counter.interval)
  }
  
  target.textContent = counter.delay
  counter.delay -= 1
}

function redirect (event) {
  event.preventDefault()
  refresh(event.target)
}

on(':root meta[http-equiv="refresh"]', (element, next) => {
  const counter = parse(element)
  
  defer(select(document), counter)
  next()
})

on('.anticore meta[http-equiv="refresh"]', (element, next) => {
  const counter = parse(element)
  
  defer(select(element.parentNode), counter)
  setTimeout(refresh, counter.delay * 1000, counter)
  next()
})

// Contract pour déclencher la redirection hard sur clic du bouton "revenir à l'accueil maintenant"
on('main.error a.redirect', (element, next) => {
  element.addEventListener('click', redirect)
  next()
})