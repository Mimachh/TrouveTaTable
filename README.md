1. Set the .env variables for stripe 
2. Seed the database
3. php artisan cashier:webhook
4. Refaire les products, en sachant que je vais afficher le prix / m pour l'annuel mais sur stripe je dois mettre le prix annuel en 1 fois. 

nl2br comme validation pour avoir les sauts de ligne en br

- Faire les tests pour : créer des horaires / créer une résa / update une résa / ajouter en tant qu'admin une résa / créer , updater et supprimer des tables


- Table et model pour envoyer un message à un restaurant + notification.

- recheck les endroits ou j'utilise la modale de contact, passer le check côté backend pour plus de sécurité



- Mail de rappel la veille de la réservation.

ajouter restaurant type sur welcome.
nettoyer et clarifier index de reservation.


- penser que pour faire des policy il faut vérifier que le owner du restaurant à bien des souscription + que les user font bien parti de la team du restaurant


- ajouter toutes les policy du restaurant + montrer ou non les boutons dans les pages en fonction + (table déjà policy mais bouton pas caché)

## Liste des services proposés :
- page web
- module de resa
- page de contact
- inscription à newsletter
- notation + avis EN COURS - Faire page qui affiche tous les avis clients et l'ajouter au mail newRatingNotifyRestaurant + 
- gestion des résa avec qr code A FAIRE
- associer son menu à un qrcode A FAIRE
- api A FAIRE
- mail de rappel
- tester mail de rating avec vérif subscribed



- supprimer son compte et ses cascades
- supprimer un resto et les cascades : les suppressions doivent être :
    - les files : banner, avatar, les medias
    - les services
    - les réservations
    - les messages
    - les newsletter user



- notif mail pour message reçu
- abonnement.
- qr code


- Faire page qui affiche tous les avis clients + corriger le message d'erreur qui apparait vite fait


- vérifier les crons
- ajouter un cron qui vérifie le niveau de souscription et qui rend false les : messages, active, booking, page

- CE SOIR : 
    - corriger le message d'erreur qui apparait vite fait