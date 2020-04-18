
// défini des fonctions liées a la gestion d'une range de date et de sa date centrale (typiquement le timeline du calendrier)

import * as baseDate from './base.js'

// calcul de la date de début et de fin d'une range de date à partir d'une date centrel et d'une fenetre en nombre de jours
export function twoDateFromCenter (centerDate, range) {
  const p = Number(range) // conversion en nombre de la range si jamais elle arrive en texte
  const start = baseDate.addDays(centerDate, -(Math.floor(p / 2)))
  const end = baseDate.addDays(start, p)

  return { start, end }
}

// calcul la date centrale d'une range de date
export function centerFromTwoDate ({ start, end }) {
  return new Date((start.getTime() + end.getTime()) / 2) // Retourne la date moyenne entre 2 dates
}

// Retourne le premier jour de l'année et de l'année suivante
export function twoDateYear (date) {
  const copiedate = new Date(date) // copie de la date pour ne pas la modifier

  const start = new Date(copiedate.getFullYear(), 0, 1, 0, 0, 0, 0) // on commence au 1er janvier de l'année
  const end = new Date(copiedate.getFullYear() + 1, 0, 1, 0, 0, 0, 0) // termine au 1er janvie rda l'année suivante

  return { start: start, end: end }
}

// Retourne le premier jour du mois et du mois suivant
export function twoDateMonth (date) {
  const copiedate = new Date(date) // copie de la date pour ne pas la modifier

  let start = new Date(copiedate.setDate(1)) // la range de date commence au premier jour du mois
  start = new Date(start.setHours(0, 0, 0, 0)) // ca commence aussi à 0h00

  const end = new Date(start) // et la fin le 1 du mois suivant
  end.setMonth(end.getMonth() + 1)

  return { start: start, end: end }
}

// Retourne le premier jour de la semaine et de la semaine suivante suivante
export function twoDateWeek (date) {
  const copiedate = new Date(date) // copie de la date pour ne pas la modifier

  let dayofweek = copiedate.getDay() // on récupère le jour de la semaine
  if (dayofweek === 0) dayofweek = 7 // on décale d'une semaine si jamais on est tombé sur dimanche

  const start = new Date(copiedate.setHours(0, 0, 0, 0)) // le debut de la range est le lundi correspondant à la date centrale avec h min et s remis à 0
  start.setDate(start.getDate() - dayofweek + 1) // suite du start

  const end = new Date(start) // et la fin le lundi suivant
  end.setDate(end.getDate() + 7)

  return { start: start, end: end }
}

// Retourne le premier jour de la semaine et de la semaine suivante suivante
export function twoDateDay (date) {
  const copiedate = new Date(date) // copie de la date pour ne pas la modifier

  const start = new Date(copiedate.setHours(0, 0, 0, 0)) // La nouvelle fenêtre commence ce jour là à 0h00

  const end = new Date(start) // et la fin un jour plus tard
  end.setDate(end.getDate() + 1)

  return { start: start, end: end }
}
