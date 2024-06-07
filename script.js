function addHeader() {
    const headers = document.querySelector('header');
    let h1 = document.createElement('h1');
    h1.textContent = 'Donovan Ferreira';
    headers.appendChild(h1);
    let h2 = document.createElement('h2');
    h2.textContent = `Developpeur d'application`;
    headers.appendChild(h2);

    let nav = document.createElement('nav');
    nav.className = 'd-flex justify-content-around gap-1 gap-md-3 gap-lg-5';

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
// Fonction pour charger le fichier XML avec fetch
async function loadXMLDoc(filename) {
    try {
        let response = await fetch(filename);
        let data = await response.text();
        let parser = new DOMParser();
        return parser.parseFromString(data, 'text/xml');
    } catch (error) {
        console.error(error);
    }
}

function balise_add_xml(xml, name_selector, name_balise, class_balise, balise_parent) {
    balise = balise_class(name_balise, class_balise, balise_parent);
    balise.textContent = xml.querySelector(name_selector).textContent;
    if (name_balise === 'a') {
        try {
            const link = xml.querySelector('link_projet').textContent;
            balise.href = link;
        } catch {}
    }
    return balise;
}
function balise_class(name_balise, class_balise, balise_parent) {
    const balise = document.createElement(name_balise);
    balise.className = class_balise;
    if (balise_parent) {
        balise_parent.appendChild(balise);
    } else {
        console.log('else', balise_parent);
    }
    return balise;
}

function add_project(projects_xml, balise_parent) {
    projects_xml.forEach((experience_xml) => {
        const card = balise_class('div', 'card', balise_parent);

        const h4 = balise_add_xml(experience_xml, 'nom', 'h4', '', card);
        console.log('h4', experience_xml);

        const card_content = balise_class('div', 'card_content d-flex', card);

        const card_date = balise_class('div', 'card-date', card_content);

        const date_start = balise_add_xml(experience_xml, 'date_start', 'div', '', card_date);
        const date_end = balise_add_xml(experience_xml, 'date_end', 'div', '', card_date);

        const card_content_div = balise_class('div', '', card_content);
        const card_entreprise = balise_add_xml(
            experience_xml,
            'entreprise',
            'div',
            'ps-4',
            card_content_div
        );

        const card_content_list = balise_class('ul', 'card-content-list', card_content_div);
        experience_xml.querySelectorAll('projet').forEach((projet) => {
            const projet_li = balise_class('li', '', card_content_list);
            const description_project = balise_add_xml(projet, 'description', 'a', '', projet_li);
        });
    });
}

function add_experience(xml) {
    const experience_list = document.createElement('section');
    experience_list.className = 'container-fluid col-12 col-md-6 ps-2 realisation-experience';

    const h3 = balise_class('h3', '', experience_list);
    h3.textContent = 'Études et Formations';

    const experiences_xml = xml.querySelectorAll('experience');
    add_project(experiences_xml, experience_list);

    return experience_list;
}

function add_etude(xml) {
    const etude_list = document.createElement('section');
    etude_list.className = 'container-fluid col-12 col-md-6 ps-2 realisation-etude';

    const h3 = balise_class('h3', '', etude_list);
    h3.textContent = 'Études et Formations';

    const etude_xml = xml.querySelectorAll('etude');
    add_project(etude_xml, etude_list);

    return etude_list;
}

// Fonction pour afficher les livres
function displayRealisations(xml) {
    const realisation_list = document.querySelector('#realisation-list');
    realisation_list.appendChild(add_experience(xml));
    realisation_list.appendChild(add_etude(xml));
}

window.addEventListener('load', () => {
    addHeader();
    addFooter();
    loadXMLDoc('realisation.xml')
        .then(displayRealisations)
        .catch(function (error) {
            console.error(error);
        });
});
