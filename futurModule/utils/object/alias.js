
// fonction pour changer le nom des propriétés dans l'extraction des metadatas

function alias ([from, value]) {
  const { [from]: to = from } = this

  return [to, value]
}

// remplace les nom des entrées de l'objet suivant une table d'alias.
/* usage :
    const aliases = {
        identifier: 'id',
        name: 'content',
        startDate: 'start',
        endDate: 'end'
    }

    metadatas.map(aliasAll, aliases)  // execute pour chaque élément de metadatas aliasAll(l'element) en lui passant les modifs à faire en tant que thisArg (le this dans la fonction AliasAll)
    */
export default function aliasAll (target) {
  return Object.fromEntries(Object.entries(target).map(alias, this))
}
