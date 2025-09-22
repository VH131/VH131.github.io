import { cvConfig } from "./cv-config";
import type { CVSection } from "./cv-config";

// Personal info rendering
function renderPersonalInfoSection(
  parentElement: HTMLElement,
  sectionConfig: Extract<CVSection, { type: "personInfo" }>
): void {
  const { data } = sectionConfig;
  const sectionEl = document.createElement("section");
  sectionEl.classList.add("section-img");

  sectionEl.innerHTML = `
    <img class="main-image" src="${data.imgSrc}" alt="${data.imgAlt}" />
    <h1>${data.fullName}</h1>
    <p><strong>${data.title}</strong></p>
  `;
  parentElement.appendChild(sectionEl);
}

// Contacts section rendering
function renderPersonalContactsSection(
  parentElement: HTMLElement,
  sectionConfig: Extract<CVSection, { type: "personContacts" }>
): void {
  const { data } = sectionConfig;
  const sectionEl = document.createElement("section");
  sectionEl.classList.add("section-contacts");
  sectionEl.innerHTML = "<h2>Contacts:</h2>";

  const contactList = document.createElement("ul");
  for (const key in data) {
    const contact = data[key as keyof typeof data];
    const listItem = document.createElement("li");
    listItem.innerHTML = `${key}: <a href="${contact.link}">${contact.value}</a> ${contact.icon}`;
    contactList.appendChild(listItem);
  }
  sectionEl.appendChild(contactList);
  parentElement.appendChild(sectionEl);
}

// Text block - Summary rendering
function renderTextBlockSection(
  parentElement: HTMLElement,
  sectionConfig: Extract<CVSection, { type: "textBlock" }>
): void {
  const { name, data } = sectionConfig;
  const sectionEl = document.createElement("section");
  if (name) {
    sectionEl.classList.add(`section-${name.toLowerCase()}`);
  }
  sectionEl.innerHTML = `
    <h2>${name}:</h2>
    <p>${data.content}</p>
  `;
  parentElement.appendChild(sectionEl);
}

// Experience, Education rendering, timeline
function renderTimelineSection(
  parentElement: HTMLElement,
  sectionConfig: Extract<CVSection, { type: "timeline" }>
): void {
  const { name, data } = sectionConfig;
  const sectionEl = document.createElement("section");
  if (name) {
    sectionEl.classList.add(`section-${name.toLowerCase()}`);
  }
  sectionEl.innerHTML = `<h2>${name}:</h2>`;

  const mainList = document.createElement("ul");
  data.items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<h3>${item.title} ${item.duration || ""}</h3>`;
    if (item.details?.length) {
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
type RenderFn = (parentElement: HTMLElement, sectionConfig: CVSection) => void;

const renderersByType: Record<CVSection["type"], RenderFn> = {
  personInfo: renderPersonalInfoSection as RenderFn,
  personContacts: renderPersonalContactsSection as RenderFn,
  textBlock: renderTextBlockSection as RenderFn,
  timeline: renderTimelineSection as RenderFn,
};

function getRenderSectionFn(
  sectionType: CVSection["type"]
): RenderFn | undefined {
  return renderersByType[sectionType];
}

//One CV section rendering
function renderSection(
  parentElement: HTMLElement,
  sectionConfig: CVSection
): void {
  console.log("renderSection called for type:", sectionConfig.type);
  const renderFn = getRenderSectionFn(sectionConfig.type);
  if (renderFn) {
    renderFn(parentElement, sectionConfig);
  }
}

//Multiple sections into parent element rendering
function renderSections(parentEl: HTMLElement, sections: CVSection[]): void {
  console.log("renderSections called with sections:", sections);
  sections.forEach((section) => renderSection(parentEl, section));
}

// Header rendering
function renderHeader(
  headerEl: HTMLElement | null,
  headerConfig: { title: string }
): void {
  if (!headerEl) return;
  const h1 = document.createElement("h1");
  h1.textContent = headerConfig.title;
  headerEl.appendChild(h1);
}

// Aside column rendering
function renderAside(
  asideEl: HTMLElement | null,
  asideConfig: { sections: CVSection[] }
): void {
  if (!asideEl) return;
  renderSections(asideEl, asideConfig.sections);
}

// Main column rendering
function renderMain(
  mainEl: HTMLElement | null,
  mainConfig: { sections: CVSection[] }
): void {
  if (!mainEl) return;
  renderSections(mainEl, mainConfig.sections);
}

// Footer rendering
function renderFooter(
  footerEl: HTMLElement | null,
  footerConfig: { copyYear: string; author: string }
): void {
  if (!footerEl) return;
  footerEl.innerHTML = `<p>© ${footerConfig.copyYear} ${footerConfig.author}</p>`;
}

// Whole CV rendering based on config
export function renderCV(): void {
  const headerEl = document.querySelector("header") as HTMLElement;
  const asideEl = document.querySelector(".left-column") as HTMLElement;
  const mainEl = document.querySelector(".right-column") as HTMLElement;
  const footerEl = document.querySelector("footer") as HTMLElement;

  console.log("Rendering header");
  renderHeader(headerEl, cvConfig.header);
  console.log("Rendering aside");
  renderAside(asideEl, cvConfig.aside);
  console.log("Rendering main");
  renderMain(mainEl, cvConfig.main);
  console.log("Rendering footer");
  renderFooter(footerEl, cvConfig.footer);
}
