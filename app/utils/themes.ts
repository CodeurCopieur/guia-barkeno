export interface Phrase {
  es: string
  fr: string
}

export interface Theme {
  id: string
  icon: string
  name: string
  phrases: Phrase[]
}

export const THEMES: Theme[] = [
 {id:"bases",icon:"👋",name:"Bases",phrases:[
  ["Hola","Bonjour"],
  ["Buenos días","Bonjour (le matin)"],
  ["Buenas tardes","Bonjour (l'après-midi)"],
  ["Buenas noches","Bonsoir / Bonne nuit"],
  ["Adiós","Au revoir"],
  ["Hasta luego","À plus tard"],
  ["Por favor","S'il vous plaît"],
  ["Gracias","Merci"],
  ["Muchas gracias","Merci beaucoup"],
  ["De nada","De rien"],
  ["Perdón","Pardon"],
  ["Disculpe","Excusez-moi"],
  ["Lo siento","Je suis désolé"],
  ["¿Cómo están?","Comment allez-vous ?"],
  ["Bien, gracias","Bien, merci"],
  ["No entiendo","Je ne comprends pas"],
  ["Una botella de agua","Une bouteille d'eau"],
  ["Una jarra de agua, por favor","Une carafe d'eau, s'il vous plaît"],
  ["Un zumo de naranja","Un jus d'orange"],
  ["Una manzana","Une pomme"],
  ["El documento de identidad","La carte d'identité"],
  ["¿Les enseñamos nuestro documento de identidad?","On vous montre notre carte d'identité ?"],
  ["La tarjeta bancaria","La carte bancaire"],
  ["Pagamos con tarjeta","On paie par carte"],
  ["¿Puede repetir más despacio?","Pouvez-vous répéter plus lentement ?"],
  ["¿Habla inglés o francés?","Parlez-vous anglais ou français ?"]
 ].map(p=>({es:p[0],fr:p[1]}))},
 {id:"nous",icon:"🇫🇷",name:"Parler de nous",phrases:[
  ["Buenas, somos una pareja francesa de vacaciones. Vamos a visitar la ciudad, pero no hablamos muy bien español.","Bonjour, nous sommes un couple français en vacances. On va visiter la ville, mais on ne parle pas très bien espagnol."],
  ["Venimos de Francia","Nous venons de France"],
  ["Venimos de Francia, de París","Nous venons de France, de Paris"],
  ["Somos de París","Nous sommes de Paris"],
  ["Estoy aquí con mi novia","Je suis ici avec ma compagne"],
  ["Estoy aquí con mi novio","Je suis ici avec mon compagnon"],
  ["Somos franceses y estamos aquí de vacaciones","Nous sommes français et nous sommes ici en vacances"],
  ["Es nuestra primera vez en Barcelona","C'est notre première fois à Barcelone"],
  ["Vamos a estar aquí una semana","Nous allons rester ici une semaine"],
  ["Queremos visitar lugares bonitos de la ciudad","Nous voulons visiter des lieux sympas de la ville"],
  ["¿Qué nos recomienda ver durante nuestras vacaciones?","Que nous recommandez-vous de voir pendant nos vacances ?"],
  ["Lo siento, no hablamos muy bien español","Désolé, on ne parle pas très bien espagnol"],
  ["Solo entendemos un poco de español","On ne comprend qu'un peu l'espagnol"],
  ["Hemos aprendido algunas frases para hablar con la gente","Nous avons appris quelques phrases pour discuter avec les gens"],
  ["Hablemos despacio, por favor","Parlons lentement, s'il vous plaît"]
 ].map(p=>({es:p[0],fr:p[1]}))},
 {id:"langue",icon:"🗣️",name:"Se faire comprendre",phrases:[
  ["Tengo una pregunta","J'ai une question"],
  ["Tenemos otra pregunta","On a encore une question"],
  ["¿Puedo enseñarles mi pregunta? Mi español no es muy bueno","Puis-je vous montrer ma question ? Mon espagnol n'est pas très bon"],
  ["Hablamos solo un poco de español","Nous ne parlons qu'un peu l'espagnol"],
  ["No hablamos bien español","Nous ne parlons pas très bien espagnol"],
  ["Lo siento, nuestro español es malo","Désolé, notre espagnol est mauvais"],
  ["¿Puede hablar más despacio, por favor?","Pouvez-vous parler plus lentement, s'il vous plaît ?"],
  ["¿Puede repetir, por favor?","Pouvez-vous répéter, s'il vous plaît ?"],
  ["No entiendo, disculpe","Je ne comprends pas, excusez-moi"],
  ["¿Nos lo puede escribir?","Pouvez-vous nous l'écrire ?"],
  ["¿Habla alguien inglés aquí?","Est-ce que quelqu'un parle anglais ici ?"],
  ["Queremos usar una aplicación de traducción","Nous voulons utiliser une application de traduction"],
  ["Vamos a usar el traductor del móvil","On va utiliser le traducteur du téléphone"],
  ["¿Puede leer esto? está en francés","Pouvez-vous lire ceci ? c'est en français"],
  ["Tranquilo, vamos a traducir con el móvil","Pas de souci, on va traduire avec le téléphone"]
 ].map(p=>({es:p[0],fr:p[1]}))},
 {id:"gens",icon:"💬",name:"Parler aux gens",phrases:[
  ["Me llamo…","Je m'appelle…"],
  ["Esta es mi pareja","Voici ma compagne"],
  ["Somos franceses","Nous sommes français"],
  ["Estamos de vacaciones","Nous sommes en vacances"],
  ["Encantados de conocerte","Enchantés de te rencontrer"],
  ["¿Nos puede ayudar?","Pouvez-vous nous aider ?"],
  ["Busco…","Je cherche…"],
  ["Estamos buscando un restaurante","Nous cherchons un restaurant"],
  ["¿Dónde se encuentra…?","Où se trouve… ?"],
  ["¿Dónde puedo comprar agua?","Où puis-je acheter de l'eau ?"],
  ["¿Dónde está la salida?","Où est la sortie ?"],
  ["De acuerdo","D'accord"],
  ["Claro que sí","Bien sûr"],
  ["Un momento","Un instant"],
  ["¿Cuánto cuesta?","Combien ça coûte ?"],
  ["Más despacio, por favor","Plus lentement, s'il vous plaît"],
  ["¡Sin problema!","Pas de problème !"]
 ].map(p=>({es:p[0],fr:p[1]}))},
 {id:"hotel",icon:"🏨",name:"Hôtel",phrases:[
  ["Tenemos una reserva a nombre de…","Nous avons une réservation au nom de…"],
  ["Buenas tardes, venimos para el check-in, tenemos una habitación reservada.","Bonjour, nous venons pour le check-in, nous avons une chambre réservée."],
  ["¿Nos puede llevar a este hotel, por favor? Aquí está la dirección.","Pouvez-vous nous emmener à cet hôtel, s'il vous plaît ? Voici l'adresse."],
  ["¿A qué hora podemos entrar a la habitación?","À quelle heure pouvons-nous entrer dans la chambre ?"],
  ["¿A qué hora hay que dejar libre la habitación?","À quelle heure faut-il libérer la chambre ?"],
  ["¿Podemos dejar las maletas aquí después del check-out?","On peut laisser les valises ici après le check-out ?"],
  ["¿Hay ascensor?","Il y a un ascenseur ?"],
  ["El wifi no funciona en nuestra habitación","Le wifi ne fonctionne pas dans notre chambre"],
  ["¿Podemos tener otra almohada y una manta?","Pouvons-nous avoir un autre oreiller et une couverture ?"],
  ["¿Dónde podemos desayunar cerca del hotel?","Où peut-on petit-déjeuner près de l'hôtel ?"]
 ].map(p=>({es:p[0],fr:p[1]}))},
 {id:"ciudad",icon:"🗺️",name:"Se déplacer en ville",phrases:[
  ["¿Dónde está el baño?","Où sont les toilettes ?"],
  ["¿Dónde está el metro?","Où est le métro ?"],
  ["¿Cómo llegamos al centro?","Comment aller au centre-ville ?"],
  ["¿Está cerca o lejos?","C'est près ou loin ?"],
  ["¿Podemos ir andando?","On peut y aller à pied ?"],
  ["Todo recto","Tout droit"],
  ["A la izquierda / a la derecha","À gauche / à droite"],
  ["Estamos perdidos","Nous sommes perdus"],
  ["¿Hay un cajero por aquí?","Il y a un distributeur par ici ?"],
  ["Queremos dos billetes de metro","Nous voudrions deux tickets de métro"],
  ["Una tarjeta de diez viajes","Une carte de dix voyages"],
  ["Disculpe, ¿este autobús va al centro de la ciudad?","Excusez-moi, ce bus va au centre-ville ?"],
  ["Pare aquí, por favor. Es justo en esta esquina.","Arrêtez-vous ici s'il vous plaît. C'est juste à ce coin-là."],
  ["¿Me puede indicar cómo llegar a pie al barrio gótico?","Pouvez-vous m'indiquer comment aller à pied dans le quartier gothique ?"],
  ["¿Qué lugares no nos podemos perder en Barcelona?","Quels lieux ne devons-nous pas manquer à Barcelone ?"]
 ].map(p=>({es:p[0],fr:p[1]}))},
 {id:"sagrada",icon:"🏛️",name:"Sagrada Família",phrases:[
  ["Tenemos las entradas para la Sagrada Família en el móvil","Nous avons les billets pour la Sagrada Família sur le téléphone"],
  ["Tenemos la visita a las cuatro de la tarde","Nous avons la visite à quatre heures de l'après-midi"],
  ["¿Es esta la cola para quienes ya tienen entrada?","C'est la file pour ceux qui ont déjà un billet ?"],
  ["Nuestro horario de acceso es este","Voici notre créneau d'entrée"],
  ["¿Por dónde entramos con las entradas?","Par où entre-t-on avec les billets ?"],
  ["¿Dónde se cogen las audioguías?","Où prend-on les audioguides ?"],
  ["Dos audioguías en francés, por favor","Deux audioguides en français, s'il vous plaît"],
  ["¿Cuánto dura la visita completa?","La visite complète dure combien de temps ?"],
  ["¿Podemos subir a la torre con estas entradas?","On peut monter à la tour avec ces billets ?"],
  ["¿Podemos hacer fotos dentro?","On peut prendre des photos à l'intérieur ?"],
  ["¿Dónde están los baños dentro de la basílica?","Où sont les toilettes dans la basilique ?"],
  ["¡Es increíble! ¡Qué bonito!","C'est incroyable ! Que c'est beau !"]
 ].map(p=>({es:p[0],fr:p[1]}))},
 {id:"campnou",icon:"⚽",name:"Camp Nou & maillot",phrases:[
  ["Queremos hacer la visita del estadio y el museo","Nous voulons faire la visite du stade et le musée"],
  ["Tenemos las entradas para el tour en el móvil","Nous avons les billets pour la visite sur le téléphone"],
  ["¿Por dónde empieza la visita?","Par où commence la visite ?"],
  ["¿Podemos entrar con una mochila pequeña?","Peut-on entrer avec un petit sac à dos ?"],
  ["¿Cuánto dura el recorrido completo?","Le parcours complet dure combien de temps ?"],
  ["¿Dónde está la tienda oficial del club?","Où est la boutique officielle du club ?"],
  ["Queremos comprar una camiseta del Barça","Nous voulons acheter un maillot du Barça"],
  ["¿Tienen esta camiseta en talla M?","Avez-vous ce maillot en taille M ?"],
  ["¿Se puede poner nuestro nombre y un número en la espalda?","On peut mettre notre nom et un numéro dans le dos ?"],
  ["¿Cuánto cuesta en total con la personalización?","Combien ça coûte au total avec la personnalisation ?"],
  ["Es un regalo, ¿la pueden meter en una bolsa?","C'est un cadeau, pouvez-vous la mettre dans un sac ?"],
  ["¡Qué grande es este estadio!","Ce stade est immense !"],
  ["¡Visca el Barça!","Vive le Barça ! (en catalan)"]
 ].map(p=>({es:p[0],fr:p[1]}))},
 {id:"restaurante",icon:"🍤",name:"Restaurants",phrases:[
  ["Una mesa para dos, por favor","Une table pour deux personnes, s'il vous plaît"],
  ["¿Tiene una mesa libre?","Vous avez une table libre ?"],
  ["Buenas tardes, una mesa para dos en la terraza si es posible.","Bonjour, une table pour deux en terrasse si possible."],
  ["La carta, por favor","La carte, s'il vous plaît"],
  ["¿Qué nos recomienda?","Que nous recommandez-vous ?"],
  ["Queremos probar las tapas típicas: patatas bravas y croquetas.","Nous voulons goûter les tapas typiques : patatas bravas et croquetas."],
  ["Dos menús del día con postre, por favor.","Deux menus du jour avec dessert, s'il vous plaît."],
  ["Uno de nosotros es vegetariano / vegetariana","L'un(e) de nous est végétarien(ne)"],
  ["Sin gluten","Sans gluten"],
  ["Una caña, por favor","Une petite bière pression, s'il vous plaît"],
  ["Dos copas de vino tinto","Deux verres de vin rouge"],
  ["Dos aguas, una sin gas y otra con gas","Deux eaux : une plate et une gazeuse"],
  ["Para llevar, por favor","À emporter, s'il vous plaît"],
  ["Estaba delicioso, todo riquísimo","C'était délicieux, tout était très bon"],
  ["La cuenta, por favor","L'addition, s'il vous plaît"],
  ["¿Podemos pagar con tarjeta?","On peut payer par carte ?"],
  ["¿Podemos pagar cada uno con su propia tarjeta?","On peut payer chacun avec sa propre carte ?"],
  ["¿El servicio está incluido?","Le service est-il compris ?"]
 ].map(p=>({es:p[0],fr:p[1]}))},
 {id:"situaciones",icon:"🧭",name:"Situations concrètes",phrases:[
  ["Disculpe, ¿podría hacernos una foto de los dos?","Excusez-moi, pourriez-vous nous prendre une photo à deux ?"],
  ["¿Nos podría recomendar un buen restaurante de tapas por aquí cerca?","Pourriez-vous nous recommander un bon restaurant de tapas près d'ici ?"],
  ["Perdone, ¿hasta qué hora están abiertos los museos hoy?","Excusez-moi, jusqu'à quelle heure les musées sont-ils ouverts aujourd'hui ?"],
  ["¿Hay farmacia abierta por aquí cerca a estas horas?","Y a-t-il une pharmacie de garde par ici à cette heure-ci ?"],
  ["Somos turistas franceses y no conocemos bien la ciudad.","Nous sommes des touristes français et ne connaissons pas bien la ville."],
  ["Lo siento, no entendemos bien el español, ¿puede escribirlo en un papel?","Désolé, nous ne comprenons pas bien l'espagnol, pouvez-vous l'écrire sur papier ?"],
  ["¿Dónde podemos comprar recuerdos típicos de Barcelona?","Où peut-on acheter des souvenirs typiques de Barcelone ?"],
  ["Disculpe, ¿está lejos el barrio gótico desde aquí?","Excusez-moi, le quartier gothique est loin d'ici ?"]
 ].map(p=>({es:p[0],fr:p[1]}))},
 {id:"urgencias",icon:"🚨",name:"Urgences",phrases:[
  ["¡Ayuda!","Au secours !"],
  ["Llame a la policía","Appelez la police"],
  ["Llame a una ambulancia","Appelez une ambulance"],
  ["Necesitamos un médico","Nous avons besoin d'un médecin"],
  ["Me han robado el móvil","On m'a volé mon téléphone"],
  ["He perdido mi cartera","J'ai perdu mon portefeuille"],
  ["¿Dónde está la comisaría?","Où est le commissariat ?"],
  ["Emergencias: 112","Urgences : 112"],
  ["Necesitamos ayuda, por favor","Nous avons besoin d'aide, s'il vous plaît"]
 ].map(p=>({es:p[0],fr:p[1]}))}
]

export const PER_SLIDE = 3
