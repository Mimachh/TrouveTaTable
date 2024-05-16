1. Set the .env variables for stripe 
2. Seed the database
3. php artisan cashier:webhook
4. Refaire les products, en sachant que je vais afficher le prix / m pour l'annuel mais sur stripe je dois mettre le prix annuel en 1 fois. 



- Ajouter une fonction au model restaurant pour savoir si le nombre d'invités est possible. Si aucune table n'accueille il faut un message custom.

- Préciser qu'il s'agit d'heure de service et que la résa doit se situer dedans.
- Ajouter les heures avant début et fin du service et a quel moment doit se stopper la possibilité de réserver.


- Faire les tests pour : créer un restau / créer des horaires / créer une résa / update une résa / ajouter en tant qu'admin une résa / créer , updater et supprimer des tables


- Table et model pour envoyer un message à un restaurant + notification.



- Réfléchir au système de liste d'attente. = renvoyer les autres tables suite à la vérif et les mettre dans un select particulier.
Le client s'inscrit. Si une réservation sur cette table pour ce service est annulée alors le client 1 en liste d'attente est inscrit en résa et reçoit un mail, mail dans lequel il peut annuler ou confirmer. S'il ne confirme pas avant le début du service la table ne sera pas réservée.






- URGENT : nettoyer store controller
ajouter restaurant type sur welcome.
nettoyer et clarifier index de reservation.


- penser que pour faire des policy il faut vérifier que le owner du restaurant à bien des souscription + que les user font bien parti de la team du restaurant




## Liste des services proposés :
- page web
- module de resa
- api
- page de contact
- gestion des résa avec qr code
- associer son menu à un qrcode




# plus tard 
- click and collect
- service de livraison
- liste d'attente
- service de mail marketing
