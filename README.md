# generateurmotdepasse

## développement local
* `git clone repository`
* `cd nodejs`
* `npm install`
* `cd ../ionicreact`
* `npm install`
* `ionic serve` pour tester
* `npm run build` pour version de production
* `cp -R ~/generateurmotdepasse/ionicreact/build/* ~/generateurmotdepasse/nodejs/public/`
* `pm2 start ./bin/www  --watch`
* `pm2 startup`


## stack technique:

	sur 172.16.2.20 : nginx nodejs pm2
	git commit/push du poste de dev vers github puis git pull manuel sur repo puis copie de fichiers (npm run build dans le dossier ionicreact)
	sur azure : static web app
	git commit/push du poste de dev vers github puis chaine CI/CD automatique, si pas erreur mise en prod