// opérations de base sur les dates 


// Ajout de jours à une date
export function addDays (date, days) {
    const copy = new Date(Number(date))
  
    copy.setDate(date.getDate() + days)
  
    return copy
}
  



