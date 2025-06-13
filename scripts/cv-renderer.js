//Personal info rendering
function renderPersonalInfoSection(parentElement, sectionConfig) {
  const { data } = sectionConfig;
  const sectionEl = document.createElement("section");
  sectionEl.classList.add("section-img");

  sectionEl.innerHTML = `
            <img class = "main-image" src="${data.imgSrc}"  alt="${data.imgAlt}" />
            <h1>${data.fullName}</h1>
            <p><strong>${data.title}</strong></p>
        `;
  parentElement.appendChild(sectionEl);
}

// Contacts section rendering
function renderPersonalContactsSection(parentElement, sectionConfig) {
  const { data } = sectionConfig;
  const sectionEl = document.createElement("section");
  sectionEl.classList.add("section-contacts");
  sectionEl.innerHTML = "<h2>Contacts:</h2>";

  const contactList = document.createElement("ul");
  for (const key in data) {
    const contact = data[key];
    const listItem = document.createElement("li");
    listItem.innerHTML = `${key}: <a href = "${contact.link}">${contact.value}</a> ${contact.icon}`;
    contactList.appendChild(listItem);
  }
  sectionEl.appendChild(contactList);
  parentElement.appendChild(sectionEl);
}
// Text block - Summary rendering
function renderTextBlockSection(parentElement, sectionConfig) {
  const { name, data } = sectionConfig;
  const sectionEl = document.createElement("section");
  sectionEl.classList.add(`section-${name.toLowerCase()}`);
  sectionEl.innerHTML = `
              <h2>${name}:</h2>
              <p>${data.content}</p>
        `;
  parentElement.appendChild(sectionEl);
}
//Experience, Education rendering
function renderTimelineSection(parentElement, sectionConfig) {
  const { name, data } = sectionConfig;
  const sectionEl = document.createElement("section");
  sectionEl.classList.add(`section-${name.toLowerCase()}`);
  sectionEl.innerHTML = `<h2>${name}:</h2>`;

  const mainList = document.createElement("ul");
  data.items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<h3>${item.title} ${
      item.duration ? item.duration : ""
    }</h3>`;
    if (item.details && item.details.length > 0) {
      const subList = document.createElement("ul");
      item.details.forEach((detail) => {
        const detailItem = document.createElement("li");
        detailItem.textContent = detail;
        subList.appendChild(detailItem);
      });
      listItem.appendChild(subList);
    }
    mainList.appendChild(listItem);
  });
  sectionEl.appendChild(mainList);
  parentElement.appendChild(sectionEl);
}

// Rendering map mechanizm
const renderersByType = {
  personInfo: renderPersonalInfoSection,
  personContacts: renderPersonalContactsSection,
  textBlock: renderTextBlockSection,
  timeline: renderTimelineSection,
};

function getRenderSectionFn(sectionType) {
  const renderFn = renderersByType[sectionType];
  return renderFn;
}

//One CV section rendering
function renderSection(parentElement, sectionConfig) {
  const renderFn = getRenderSectionFn(sectionConfig.type);
  if (renderFn) {
    renderFn(parentElement, sectionConfig);
  }
}
//Multiple sections into parent element rendering
function renderSections(parentEl, sections) {
  for (const section of sections) {
    renderSection(parentEl, section);
  }
}

//Header rendering
function renderHeader(headerEl, headerConfig) {
  const h1 = document.createElement("h1");
  h1.textContent = headerConfig.title;
  headerEl.appendChild(h1);
}
//Aside column rendering
function renderAside(asideEl, asideConfig) {
  renderSections(asideEl, asideConfig.sections);
}
//Main column rendering
function renderMain(mainEl, mainConfig) {
  renderSections(mainEl, mainConfig.sections);
}
//Footer rendering
function renderFooter(footerEl, footerConfig) {
  footerEl.innerHTML = `<p>© ${footerConfig.copyYear} ${config.footer.author}</p>`;
}

//Whole CV rendering based on config
function renderCV() {
  // Export this function
  const headerEl = document.querySelector("header");
  const asideEl = document.querySelector(".left-column");
  const mainEl = document.querySelector(".right-column");
  const footerEl = document.querySelector("footer");

  renderHeader(headerEl, config.header);
  renderAside(asideEl, config.aside);
  renderMain(mainEl, config.main);
  renderFooter(footerEl, config.footer);
}
