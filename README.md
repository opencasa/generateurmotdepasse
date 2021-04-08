# Générateur de mot de passe sécurisé

## Développement local
* `git clone repository`
* `cd nodejs`
* `npm install`
* `cd ../ionicreact`
* `npm install`
* `ionic serve` pour tester
* `pm2 start ./bin/www  --watch`
* `pm2 startup`

## Déploiement en production 
* `cd ~/generateurmotdepasse/`
* `git pull`
* `cd ~/generateurmotdepasse/ionicreact/`
* `npm run build`
* `cp -R ~/generateurmotdepasse/ionicreact/build/* ~/generateurmotdepasse/nodejs/public/`

## Stack technique:

Sur un serveur local : nginx nodejs pm2
git commit/push du poste de dev vers github puis git pull manuel sur repo puis copie de fichiers (npm run build dans le dossier ionicreact)

Sur Azure : Static Web App
git commit/push du poste de dev vers github puis chaine CI/CD automatique, si pas d'erreur mise en production