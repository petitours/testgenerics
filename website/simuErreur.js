// Route spéciale pour tester la page d'erreur

function simuError () {
    return async ({context}) => {
     
      // @ts-ignore
      Badaboum //on crée une erreur : variable non déclarée

      return context
    }
  }
  


  export const GETsimuErrorHooks = [
    simuError ()
  ]