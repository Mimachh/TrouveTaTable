deploy:
	ssh rzgf6652@expresso.o2switch.net 'cd ~/public_html/SAAS/karl/trouvetatable.mimach.fr && git pull origin main && make install'

install: .env public/storage vendor/autoload.php public/build/manifest.json
	# php artisan cache:table
	php artisan cache:clear
	php artisan migrate
	# php artisan db:seed
	# php artisan config:cache
	php artisan route:cache
	php artisan view:cache

.env: 
	cp .env.example .env
	php artisan key:generate

public/storage:
	php artisan storage:link

vendor/autoload.php: composer.lock
	composer install
	touch vendor/autoload.php

public/build/manifest.json: package.json
	/opt/alt/alt-nodejs20/root/usr/bin/npm i
	/opt/alt/alt-nodejs20/root/usr/bin/npm run build