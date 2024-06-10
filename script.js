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

function createTagWithParent(name_tag, class_tag, tag_parent, content) {
    const tag = document.createElement(name_tag);
    tag.className = class_tag;
    if (tag_parent) {
        tag_parent.appendChild(tag);
    } else {
        console.log('else', tag_parent);
    }
    tag.textContent = content;
    return tag;
}

function addHeadContent() {
    const head = document.querySelector('head');

    const metaCharset = createTagWithParent('meta', '', head);
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
    // createLinkFontGoogle(head);
}
function createMetaTag(head, name, content) {
    const metaViewport = createTagWithParent('meta', '', head);
    metaViewport.name = name;
    metaViewport.content = content;
}
function addHeader() {
    const headers = document.querySelector('header');

    let h1 = createTagWithParent('h1', '', headers, 'Donovan Ferreira');
    let h2 = createTagWithParent('h2', '', headers, "Developpeur d'application");
    let nav = createTagWithParent('nav', 'nav-bar row row-cols-2 row-cols-md-4', headers);

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
function createLinkFontGoogle(head) {
    createLink(head, 'https://fonts.googleapis.com', 'preconnect');
    createLink(head, 'https://fonts.gstatic.com', 'preconnect');
    createLink(
        head,
        'https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&display=swap',
        'stylesheet'
    );
}
function createLink(head, href, rel, integrity, crossorigin) {
    let tag = document.createElement('script');
    tag.src = href;
    if (['stylesheet', 'preconnect'].includes(rel)) {
        tag = document.createElement('link');
        tag.rel = rel;
        tag.href = href;
    }
    tag.integrity = integrity;
    tag.crossOrigin = crossorigin;
    head.appendChild(tag);
}

function createLinkNav(nav, href, text) {
    let link = createTagWithParent('a', 'nav-bar-link', nav, text);
    link.href = href;
    if (document.title === text) {
        link.classList.add('active');
    }
}
function getFileFromUrl() {
    const pathname = window.location.pathname;
    const regexName = /^[\w\W]*\//;
    const filename = pathname.replace(regexName, '');
    return filename;
}

function addFooter() {
    const footer = document.getElementsByTagName('footer')[0];
    let div = document.createElement('div');
    let span = document.createElement('span');
    span.innerHTML = 'Copyright © 2024 Donovan Ferreira. Tous droits réservés.';
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
        realisation_list.appendChild(addExperienceEtude(xml, 'experience', 'Experiences'));
        realisation_list.appendChild(addExperienceEtude(xml, 'etude', 'Études et Formations'));
    }
}
function addExperienceEtude(xml, selector, title) {
    const experience_list = document.createElement('section');
    experience_list.className = 'container-fluid col-12 col-lg-6 ps-2';

    const h3 = createTagWithParent('h3', '', experience_list, title);

    const experiences_xml = xml.querySelectorAll(selector);
    addProject(experiences_xml, experience_list);

    return experience_list;
}

function createTagFromXml(xml, name_selector, name_tag, class_tag, tag_parent) {
    tag = createTagWithParent(
        name_tag,
        class_tag,
        tag_parent,
        xml.querySelector(name_selector).textContent
    );
    return tag;
}
function addProject(projects_xml, tag_parent) {
    projects_xml.forEach((experience_xml) => {
        const card = createTagWithParent('div', 'card', tag_parent);

        const h4 = createTagFromXml(experience_xml, 'nom', 'h4', '', card);

        const card_content = createTagWithParent('div', 'card-content d-flex', card);

        const card_date = createTagWithParent('div', 'card-content-date col-2', card_content);

        const date_start = createTagFromXml(experience_xml, 'date_start', 'div', '', card_date);
        const date_end = createTagFromXml(experience_xml, 'date_end', 'div', '', card_date);

        const card_content_div = createTagWithParent(
            'div',
            'col-10 card-content-div',
            card_content
        );
        const card_entreprise = createTagFromXml(
            experience_xml,
            'entreprise',
            'div',
            'ps-4',
            card_content_div
        );

        const card_content_list = createTagWithParent(
            'ul',
            'card-content-div-list',
            card_content_div
        );

        card.addEventListener('mouseenter', () => {
            const contentList = card.querySelector('.card-content-div-list');
            contentList.classList.add('visible');
            contentList.style.height = contentList.scrollHeight + 'px';
        });

        card.addEventListener('mouseleave', () => {
            const contentList = card.querySelector('.card-content-div-list');
            contentList.style.height = '0';
            contentList.classList.remove('visible');
        });

        experience_xml.querySelectorAll('projet').forEach((projet) => {
            const projet_li = createTagWithParent(
                'li',
                'card-content-div-list-project',
                card_content_list
            );
            const projet_a = createTagWithParent(
                'a',
                'card-content-div-list-project-link',
                projet_li
            );
            try {
                projet_a.href = projet.querySelector('link_projet').textContent;
            } catch (error) {}
            const description_project = createTagFromXml(
                projet,
                'description',
                'div',
                '',
                projet_a
            );
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

    el.style.height = Math.max(el.scrollHeight, 100) + 'px';
}
