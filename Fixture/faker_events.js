
import faker from 'faker' ;   // générateur de contenu bidon
import moment from 'moment' ; // pour manipuler les dates
import monknex from '../DAL/connexion/monknex.js';


// a lancer avec node -r esm Fixture/faker_events.js

// Creation d'un évènement bidon
function makeEventBidon() {
  const start = faker.date.between('2012-01-01', '2024-12-31');  //on determine une date de début
  const end =   faker.date.past(-0.03,start) ; //calcul d'une date de fin
  let event = faker.fake("{{lorem.words}} avec {{name.firstName}} {{name.lastName}}") ;
  event = event.replace("'","''");      // remplacement des apostrophes par 2 apostrophes 

  return "('" + event + "','" 
    + moment(start).format("YYYY-MM-DD HH:mm:ss") + "','" 
    + moment(end).format("YYYY-MM-DD HH:mm:ss") + "'),"
};

// effacement de la table des evenements
monknex.schema.dropTableIfExists('t_agenda_evt').then(function() {
  console.log("Table t_agenda_evt deleted")
});



// recreation de la table
monknex.schema.createTable('t_agenda_evt', function (table) {
  table.increments('id_evt').primary();
  table.string('content', 250) ;
  table.dateTime('start');
  table.dateTime('end');
}).then(function() {
  console.log("Table t_agenda_evt cree")
});

/*  
//Ajout d'évènemnts bidons dans la table
    // Creation de la liste des évènements
    let events = "" ;
    for (let i=0 ; i<1000 ; i++)
    {
        events += makeEventBidon() ;
    }

    // Retire la virgule finale 
    events = events.slice(0,-1) ;

    let sqlinsert = "INSERT INTO t_agenda_evt (content, start, end ) VALUES " + events ;
    //console.log(sqlinsert) ;
    db.query(sqlinsert, function (err, result) {
    if (err) throw err;
    console.log("Ajout d'éléments dans t_agenda_evt");
  });

*/