1. Set the .env variables for stripe 
2. Seed the database
3. php artisan cashier:webhook
4. Refaire les products, en sachant que je vais afficher le prix / m pour l'annuel mais sur stripe je dois mettre le prix annuel en 1 fois. 

nl2br comme validation pour avoir les sauts de ligne en br

- Faire les tests pour : créer des horaires / créer une résa / update une résa / ajouter en tant qu'admin une résa / créer , updater et supprimer des tables


- Table et model pour envoyer un message à un restaurant + notification.

- recheck les endroits ou j'utilise la modale de contact, passer le check côté backend pour plus de sécurité

- Réfléchir au système de liste d'attente. = renvoyer les autres tables suite à la vérif et les mettre dans un select particulier.
Le client s'inscrit. Si une réservation sur cette table pour ce service est annulée alors le client 1 en liste d'attente est inscrit en résa et reçoit un mail, mail dans lequel il peut annuler ou confirmer. S'il ne confirme pas avant le début du service la table ne sera pas réservée.

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



# plus tard 
- click and collect
- service de livraison
- liste d'attente
- service de mail marketing  + possibilité d'exporter en csv
- lutte anti no show (emprunte bancaire ou pré paiement) + informations sur le client




- table menus
- supprimer son compte et ses cascades
- supprimer un resto et les cascades : les suppressions doivent être :
    - les files : banner, avatar, les medias
    - les services
    - les réservations
    - les messages
    - les newsletter user





## à réfléchir :
- gestion des employés ? avec adresse/ téléphone ...
- heure travaillée par employé
jour/date/début/fin
- heure de travail prévu 
- tache pour employé
- vente
- menu






- notif mail pour message reçu
- abonnement.
- qr code


- Faire page qui affiche tous les avis clients + corriger le message d'erreur qui apparait vite fait

- Création d'un abonnement annuel ou mensuel -> servant comme base pour le SAAS

- vérifier les crons


- CE SOIR : 
    - corriger le message d'erreur qui apparait vite fait