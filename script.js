function addHeader() {
    const headers = document.querySelector('header');
    let h1 = document.createElement('h1');
    h1.textContent = 'Donovan Ferreira';
    headers.appendChild(h1);
    let h2 = document.createElement('h2');
    h2.textContent = `Developpeur Concepteur d'application`;
    headers.appendChild(h2);

    let nav = document.createElement('nav');
    nav.className = 'd-flex justify-content-around';

    let index = document.createElement('a');
    index.href = 'index.html';
    index.innerHTML = 'Accueil';
    nav.appendChild(index);

    let about = document.createElement('a');
    about.href = 'about.html';
    about.innerHTML = 'A propos';
    nav.appendChild(about);

    let realisation = document.createElement('a');
    realisation.href = 'realisation.html';
    realisation.innerHTML = 'Mes réalisations';
    nav.appendChild(realisation);

    let contact = document.createElement('a');
    contact.href = 'contact.html';
    contact.innerHTML = 'Contact';
    nav.appendChild(contact);
    headers.appendChild(nav);
}

function addFooter() {
    const footer = document.getElementsByTagName('footer')[0];
    let div = document.createElement('div');
    let span = document.createElement('span');
    span.innerHTML = 'Copyright © 2024 Oui. Tous droits réservés.';
    div.appendChild(span);
    footer.appendChild(div);
}

window.addEventListener('load', () => {
    addHeader();
    addFooter();
});
