# NerdQuest MMO

An MMO adventure game about a Nerd's daily life: 

* Finding princesses in castles
* Competing in friendly treasure hunts
* Slaying code dragons
* Cos-playing
* Forming guilds around geeky subjects
* Squashing bugs and getting code to compile

## Installing and running

First [install Meteor](https://www.meteor.com/install) if you haven't already.

Clone this project somewhere.

From the root directory, run `meteor`.

Open `http://localhost:3000/`.

## License

This project falls under the MIT license unless explicitly stated otherwise.

## Architecture

### server/services/game.js

Player entity gets build in enterGame() and gets decorated in EntityBuilder.Build()

### shared/EntityBuilder

Prefabs are json scripts added to gameobjects in Gameworld maps

Check if the prefab can be found in the spreadsheet
These are usually NPC's and thus can only be added through the server

prefabFactory = $injector.get(prefabFactoryName);

if (angular.isFunction(prefabFactory)) 
{
  if the prefab entity is a function, then it should produce
  the needed data
  angular.extend(componentData, prefabFactory(originalConfigData));
} 
else 
{
 // else assume the prefab obj is just a JSON (Constant)
 angular.extend(componentData, prefabFactory);
}

On the client, only load objects that do not have a prefab associated
We only want to load static objects over JSON
Objects with Prefabs are assumed to be dynamic so we defer loading them to the network stream