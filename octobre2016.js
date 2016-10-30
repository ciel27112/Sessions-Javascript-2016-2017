/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/xSrMtBep
 *
 * This source requires Phaser 2.6.2
 */

//var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';
    
    //Chargement des images
    game.load.image('phaser', 'sprites/phaser-dude.png');
    game.load.image('orb', 'sprites/orb-red.png');
}




//--------------------------------------------------------------------------------------





//Définition des variables globales pour les utiliser dans les autres onglets.
var player;
var orb;
var perso;
var speed = 100;
var arrows;

function create()
{
    //Le fond change de couleur
    game.stage.backgroundColor = "#FF9966";
    
    //Activation du moteur physique appelé "arcade"
    game.physics.startSystem(Phaser.Physics.Arcade);
    game.physics.arcade.gravity.y = 980;

    //Activation de l'écoute des touches flechées
    arrows = game.input.keyboard.createCursorKeys();
    
    //Création du joueur en ajoutant son image
    player = game.add.sprite(0, 0, 'phaser');
    game.physics.arcade.enable(player); //Activation et création du corps physique
    player.body.collideWorldBounds = true;
    
    //Création d'une orbe à manger en ajoutant son image
    orb = game.add.sprite(game.rnd.integerInRange(0,800),game.rnd.integerInRange(200,400),'orb');
    orb.anchor.setTo(0.5,0.5); //mettre le point d'ancrage au milieu de l'image.
    game.physics.arcade.enable(orb);//Activation et création du corps physique
    orb.body.allowGravity = false;
    orb.body.collideWorldBounds = true;
    
    
}



//--------------------------------------------------------------------------------------



function update() 
{
    //Test des touches flechées
    checkCursorKeys();
    
    //Test du moteur physique si 2 'body' se rencontrent. Si oui, une fonction sera appelée.
    //objet1, object2, la fonction qui sera appelée, ..., le contexte
    game.physics.arcade.overlap(player, orb, eatOrb, null, this); 
    
    //Animation de l'orbe dans une fonction, on donne à la fonction l'orbe à utiliser.
    animateOrb(orb); 
}


function animateOrb(obj)
{
    //On fait tourner l'orbe
    obj.body.angularVelocity = 250;
    
}


//Test si les touches flechées sont appuyées (appuyé = isDown)
//On donne une force au 'body' qui alors se déplace dans l'orientation voulue.
function checkCursorKeys() 
{
    //Pour stopper le déplacement horizontal lorsqu'on arrête d'appuyer sur les touches.
    player.body.velocity.x = 0;
    
    //Test des touches.
    if(arrows.left.isDown)
    {
        player.body.velocity.x = -speed;
    }else if(arrows.right.isDown)
    {
        player.body.velocity.x = speed;
    }
    if(arrows.up.isDown)
    {
        player.body.velocity.y = -speed;
    }else if(arrows.down.isDown)
    {
        player.body.velocity.y = speed;
    }
}

//Fonction appelée par la fonction 'overlap'. Les 2 paramètres sont les 2 objets, dans l'ordre inscrit ci-dessus.
function eatOrb(spriteA,spriteB)
{
    var newx = game.rnd.integerInRange(200,600);
    var newy = game.rnd.integerInRange(150,550);
    spriteB.reset(newx,newy);
}

 /*
    Controler la vie d'un sprite. 
    Cela permet de ne pas détruire totalement la ressource et de la réutiliser facilement.
    
    sprite.isAlive // true ou false 
    sprite.kill(); // désactive et supprime l'objet du jeu
    sprite.reset(x,y); // réactive l'objet à un endroit précis. Il est possible d'ajouter un 3eme paramètre pour la "vie" du sprite.
*/



//--------------------------------------------------------------------------------------


function render() 
{
    //Pour voir ce que représente le 'body' d'un sprite qui est lié au moteur de physique.
    game.debug.body(player);
}
