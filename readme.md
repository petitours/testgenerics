A la racine du projet on trouve :

# .env (!!! non suivi dans GIT) 
Contient les informations d'environnement confidentielles

* pas de lignes vides, (sauf une à la fin)
* pas d'espaces

# bootstrap.js
Permet d'éviter des problèmes de lien vers le .env (sous windows par exemple on peut récupérer l'environnement de node plutot que celui de l'application).

bootstrap.js parse le fichier .env. importé dans tous les points d'enrtée de l'application il fourni les information du .env parsées.

# index.js
Launcher de l'application basée sur Express


# jsconfig.json
The presence of jsconfig.json file in a directory indicates that the directory is the root of a JavaScript Project. The jsconfig.json file specifies the root files and the options for the features provided by the JavaScript language service de Visual Studio Code.

# package.json 
Configuraiton pour npm

# package-lock.json
is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.

# webpack.config.js
Configuration de webpack