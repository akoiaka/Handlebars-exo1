var ourRequest = new XMLHttpRequest();

    // parcourir le json donné par le lien ci-dessous et le rentrer dans une variable au on va nommer data.
ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/pets-data.json');
ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status <400) {
        var data = JSON.parse(ourRequest.responseText);
        createHTML(data);
    }
    // si problème de serveur on affiche un message dans la console
    else {
        console.log("we connected to the server, but it return an error.");
    }
};

ourRequest.send();

// si on veut calcler l age a partir de la date de naissance:
// il y a une methode qui s appelle registerHelper
// on récupère dans la () de la fonction le paramètre birthYear
Handlebars.registerHelper("calculateAge", function(birthYear){
    var age = new Date().getFullYear() - birthYear;
    if (age > 0) {
        return age + " years old"
    }
    else {
        return "less than a year old"
    }
});

function createHTML(petsData){
  //test lines
  //    console.log("testing our function");
  //    console.log(petsData);

    // on crée des variables pour permettre de compiler notre jSON par Handlebars et générer un HTML qui sera injecté
    // dans notre page
    var rawTemplate = document.getElementById("petsTemplate").innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var ourGeneratedHTML = compiledTemplate(petsData);

    // on cible ensuite la div vide où va être injecté html généré avec handlebar
    var petsContainer = document.getElementById("pets-container");
    petsContainer.innerHTML = ourGeneratedHTML;
}