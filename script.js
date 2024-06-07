function addHeader() {
    const headers = document.querySelector('header');

    let h1 = document.createElement('h1');
    h1.textContent = 'Donovan Ferreira';
    headers.appendChild(h1);
    let h2 = document.createElement('h2');
    h2.textContent = `Developpeur d'application`;
    headers.appendChild(h2);

    let nav = document.createElement('nav');
    nav.className = 'd-flex justify-content-around row';

    create_link_nav(nav, 'index.html', 'Accueil');
    create_link_nav(nav, 'about.html', 'A propos');
    create_link_nav(nav, 'realisation.html', 'Mes réalisations');
    create_link_nav(nav, 'contact.html', 'Contact');

    headers.appendChild(nav);
}

function create_link_nav(nav, href, text) {
    let balise = document.createElement('a');
    balise.href = href;
    balise.innerHTML = text;
    balise.className = 'col-6 col-md-3';
    if (document.title === text) {
        balise.classList.add('active');
    }
    nav.appendChild(balise);
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

        const card_content = balise_class('div', 'card_content d-flex', card);

        const card_date = balise_class('div', 'card-date col-2', card_content);

        const date_start = balise_add_xml(experience_xml, 'date_start', 'div', '', card_date);
        const date_end = balise_add_xml(experience_xml, 'date_end', 'div', '', card_date);

        const card_content_div = balise_class('div', 'col-10 card-content-div', card_content);
        const card_entreprise = balise_add_xml(
            experience_xml,
            'entreprise',
            'div',
            'ps-4',
            card_content_div
        );

        const card_content_list = balise_class('ul', 'card-content-list', card_content_div);

        card.addEventListener('mouseenter', () => {
            const contentList = card.querySelector('.card-content-list');
            contentList.classList.add('visible');
            contentList.style.height = contentList.scrollHeight + 'px'; // Définir la hauteur réelle pour une animation fluide
        });

        card.addEventListener('mouseleave', () => {
            const contentList = card.querySelector('.card-content-list');
            contentList.style.height = '0'; // Revenir à hauteur 0 pour cacher
            contentList.classList.remove('visible');
        });

        // card.addEventListener('transitionend', () => {
        //     card.querySelector('.card-content-list').classList.toggle('d-none');
        // });
        // card.addEventListener('transitionend', () => {
        //     card.querySelector('.card-content-list').classList.add('d-none');
        // });
        experience_xml.querySelectorAll('projet').forEach((projet) => {
            const projet_li = balise_class('li', '', card_content_list);
            const projet_a = balise_class('a', '', projet_li);
            try {
                projet_a.href = projet.querySelector('link_projet').textContent;
            } catch (error) {}
            const description_project = balise_add_xml(projet, 'description', 'div', '', projet_a);
        });
    });
}

function add_experience_etude(xml, selector, title) {
    const experience_list = document.createElement('section');
    experience_list.className = 'container-fluid col-12 col-lg-6 ps-2';

    const h3 = balise_class('h3', '', experience_list);
    h3.textContent = title;

    const experiences_xml = xml.querySelectorAll(selector);
    add_project(experiences_xml, experience_list);

    return experience_list;
}

// Fonction pour afficher les livres
function displayRealisations(xml) {
    const realisation_list = document.querySelector('#realisation-list');
    realisation_list.appendChild(add_experience_etude(xml, 'experience', 'Experience'));
    realisation_list.appendChild(add_experience_etude(xml, 'etude', 'Études et Formations'));
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
