
## Description

Projet réaliser avec [Nest](https://github.com/nestjs/nest) et il utilise une base de données postgres sur docker. 

Il s'agit d'une application de reservation de salle de réunion. La logique métier à respecter est la suivante:

  * Un utilisateur peut reserver une pièce,
  * Un utilisateur ne peut reserver qu'une pièce (salle) à la fois,
  * Une pièce ne peut pas être reservée simultanément par 2 utilisateurs,
  * Un utilisateur ne peut pas reserver une salle déjà booker

Le code contenu dans cette application **doit** respecter ces règles et en tant qu'équipe, il vous ai demandé de réaliser les tests nécessaire pour s'assurer de son bon fonctionnement.

## Consigne

Pas de consigne

## Installation

```bash
$ yarn
```


## Running the app

```bash
# base de données
$ docker compose up -d #ou docker-compose up -d

# watch mode
$ yarn start:dev
```

## Database

Pour faire marcher votre base de données vous devez faire la commande suivante:

```bash
# Migration
$ yarn typeorm migration:run

```

Vous pouvez vous connecter à la base de données sur l'outil de votre choix en utilisant les paramètres que vous trouverez dans le fichier: `ormconfig.ts`

Vous pourrez ensuite ajouter des données que vous jugerez utils pour vos tests.

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
