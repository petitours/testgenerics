
export default function delEvent ({ qb, table }) {
  return async ({ context, request }) => {
    // Si on arrive ici c'est que l'evenement existe (sinon getEntity() a déclenché une erreur 404)

    const { params: { id }, query: { confirmation } } = context

    if (confirmation === 'true') {
      // Marquage de l'evenement comme supprimé
      await qb(table)
        .where('id_evt', '=', id)
        .update({
          isDelete: true
        })
        // .debug(true)
    }

    return {
      ...context,
      deleted: true
    }
  }
}
