window.addEventListener('load', () => {
    addHeadContent();
    addHeader();
    addFooter();
    loadXMLDoc('realisation.xml')
        .then(displayRealisations)
        .catch(function (error) {
            console.error(error);
        });

    messageHeight();
    setTimeout(() => {
        document.querySelector('body').style.display = 'block';
    }, '50');
});
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('body').style.display = 'none';
});

const file_map = {
    'index.html': 'Accueil',
    'about.html': 'A propos',
    'realisation.html': 'Mes réalisations',
    'contact.html': 'Contact',
};

function baliseClass(name_balise, class_balise, balise_parent, content) {
    const balise = document.createElement(name_balise);
    balise.className = class_balise;
    if (balise_parent) {
        balise_parent.appendChild(balise);
    } else {
        console.log('else', balise_parent);
    }
    balise.textContent = content;
    return balise;
}

function addHeadContent() {
    const head = document.querySelector('head');

    const metaCharset = baliseClass('meta', '', head);
    metaCharset.setAttribute('charset', 'utf-8');

    const metaViewport = createMetaTag(head, 'viewport', 'width=device-width, initial-scale=1.0');
    const metaKeyword = createMetaTag(head, 'keywords', 'HTML, CSS, JavaScript');
    const metaAuthor = createMetaTag(head, 'author', 'Donovan Ferreira');
    const metaDescription = createMetaTag(head, 'description', 'Portfolio de Donovan Ferreira');

    const filename = getFileFromUrl();
    document.title = file_map[filename];
    createLinkFontAwesome(head);
    createLinkBoostrapStyle(head);
    createLinkmainCSS(head);
    createLinkBoostrapScript(head);
}
function createMetaTag(head, name, content) {
    const metaViewport = baliseClass('meta', '', head);
    metaViewport.name = name;
    metaViewport.content = content;
}
function addHeader() {
    const headers = document.querySelector('header');

    let h1 = baliseClass('h1', '', headers, 'Donovan Ferreira');
    let h2 = baliseClass('h2', '', headers, "Developpeur d'application");
    let nav = baliseClass('nav', 'nav-bar row row-cols-2 row-cols-md-4', headers);

    Object.keys(file_map).forEach((key) => {
        createLinkNav(nav, key, file_map[key]);
    });
}

function createLinkFontAwesome(head) {
    createLink(
        head,
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
        'stylesheet'
    );
}
function createLinkBoostrapStyle(head) {
    createLink(
        head,
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
        'stylesheet',
        'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH',
        'anonymous'
    );
}
function createLinkmainCSS(head) {
    createLink(head, 'style.css', 'stylesheet');
}
function createLinkBoostrapScript(head) {
    createLink(
        head,
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
        'script',
        'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz',
        'anonymous'
    );
}
function createLink(head, href, rel, integrity, crossorigin) {
    let balise = document.createElement('script');
    balise.src = href;
    if (rel === 'stylesheet') {
        balise = document.createElement('link');
        balise.rel = rel;
        balise.href = href;
    }
    balise.integrity = integrity;
    balise.crossOrigin = crossorigin;
    head.appendChild(balise);
}

function createLinkNav(nav, href, text) {
    let link = baliseClass('a', 'nav-bar-link', nav, text);
    link.href = href;
    if (document.title === text) {
        link.classList.add('active');
    }
}
function getFileFromUrl() {
    const url = window.location.href;
    const regexName = /^[\w\W]*\//;
    const filename = url.replace(regexName, '');
    return filename;
}

function addFooter() {
    const footer = document.getElementsByTagName('footer')[0];
    let div = document.createElement('div');
    let span = document.createElement('span');
    span.innerHTML = 'Copyright © 2024 Oui. Tous droits réservés.';
    div.appendChild(span);
    footer.appendChild(div);
}

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

function displayRealisations(xml) {
    const realisation_list = document.querySelector('#realisation-list');
    if (realisation_list) {
        realisation_list.appendChild(addExperienceEtude(xml, 'experience', 'Experience'));
        realisation_list.appendChild(addExperienceEtude(xml, 'etude', 'Études et Formations'));
    }
}
function addExperienceEtude(xml, selector, title) {
    const experience_list = document.createElement('section');
    experience_list.className = 'container-fluid col-12 col-lg-6 ps-2';

    const h3 = baliseClass('h3', '', experience_list, title);

    const experiences_xml = xml.querySelectorAll(selector);
    addProject(experiences_xml, experience_list);

    return experience_list;
}

function baliseAddXml(xml, name_selector, name_balise, class_balise, balise_parent) {
    balise = baliseClass(
        name_balise,
        class_balise,
        balise_parent,
        xml.querySelector(name_selector).textContent
    );
    return balise;
}
function addProject(projects_xml, balise_parent) {
    projects_xml.forEach((experience_xml) => {
        const card = baliseClass('div', 'card', balise_parent);

        const h4 = baliseAddXml(experience_xml, 'nom', 'h4', '', card);

        const card_content = baliseClass('div', 'card_content d-flex', card);

        const card_date = baliseClass('div', 'card-date col-2', card_content);

        const date_start = baliseAddXml(experience_xml, 'date_start', 'div', '', card_date);
        const date_end = baliseAddXml(experience_xml, 'date_end', 'div', '', card_date);

        const card_content_div = baliseClass('div', 'col-10 card-content-div', card_content);
        const card_entreprise = baliseAddXml(
            experience_xml,
            'entreprise',
            'div',
            'ps-4',
            card_content_div
        );

        const card_content_list = baliseClass('ul', 'card-content-list', card_content_div);

        card.addEventListener('mouseenter', () => {
            const contentList = card.querySelector('.card-content-list');
            contentList.classList.add('visible');
            contentList.style.height = contentList.scrollHeight + 'px';
        });

        card.addEventListener('mouseleave', () => {
            const contentList = card.querySelector('.card-content-list');
            contentList.style.height = '0';
            contentList.classList.remove('visible');
        });

        experience_xml.querySelectorAll('projet').forEach((projet) => {
            const projet_li = baliseClass('li', 'card-content-list-project', card_content_list);
            const projet_a = baliseClass('a', 'card-content-list-project-link', projet_li);
            try {
                projet_a.href = projet.querySelector('link_projet').textContent;
            } catch (error) {}
            const description_project = baliseAddXml(projet, 'description', 'div', '', projet_a);
        });
    });
}

function messageHeight() {
    const textarea = document.getElementById('messageContact');
    if (textarea) {
        adjustHeight(textarea);
        textarea.addEventListener('input', function () {
            adjustHeight(this);
        });
    }
}
function adjustHeight(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
}
