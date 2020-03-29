
// retourne un array d'entités lues en base, a partir de la valeur d'id issue du rule précédent
export default function toEntity ({ qb, table, id = 'id',archivedAt = 'archivedAt'  }) {
  return async value => {

    return  qb(table).select('*')
      .where({ 
        [id]: value,
        [archivedAt]: null
       })
      .first()

  }
}