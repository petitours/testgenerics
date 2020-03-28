

//il récupère donc le location du contexte, ce qui peut permettre, par exemple, de rediriger vers le rendu de l'entité sauvegardée
export function redirector () {
  
  return async ({ context, response }) => {

    response.redirect(context.location)

    return context
  }
}