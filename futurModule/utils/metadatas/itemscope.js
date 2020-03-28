


function itemprop (result, prop) {
    return {
      ...result,
      [prop.getAttribute('itemprop')]: prop.getAttribute('content') || prop.textContent
    }
  }
  
  
// Récupération des metadonnées dans la page
/* usage :
  let metadatas = [...element.querySelectorAll('tr')].map(itemscope)
      */
  export default function itemscope (scope) {
    return [...scope.querySelectorAll('[itemprop]')]
      .reduce(itemprop, {})
  }