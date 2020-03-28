

import { on } from 'anticore'
import flatpickr from "flatpickr";
import { French } from "flatpickr/dist/l10n/fr.js"


on('.anticore .dtpkrPlage', (element, next) => { 

   flatpickr(element, {    
        
        locale : French,            
        altInput: true,         // active un format différent affiché à l'utilisaateur
        altFormat: "l d/m/Y H:i", // le format affiché à l'utilisateur 
        dateFormat: "Y-m-d H:i", // le format renvoyé par le datetimepicker
        mode: "range",
        enableTime: true,   //permet d'avoir la saisie du temps également
        time_24hr: true,
        allowInput : true,  //permet de saisir manuellement ce que l'on veut directement et laisse le requiered actif
        weekNumbers: true, //affiche les numéros de semaines
    });
          
    next()
  }) 