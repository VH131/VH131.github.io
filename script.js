const config = {
  header: {
    title: 'Volodymyr Husar CV',
    fullName: 'Volodymyr Husar',
  },
  footer: {
    copyYear: '2025',
    author: 'Volodymyr Husar',
  },
  aside: {
    sections: [
      {
        type: 'personInfo',
        data: {
          fullName: 'Volodymyr Husar',
          title: 'QA Engineer',
          imgSrc: 'Panda.jpg',
          imgAlt: 'Volodymyr Husar\'s face',
        },
      },
      {
        type: 'personContacts',
        data: {
          email: {
            value: 'vovagusar7@gmail.com',
            link: 'mailto:vovagusar7@gmail.com',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>',
          },
          phone: {
            value: '+3806711111111',
            link: 'tel:+380675867131',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>',
          },
          linkedin: {
            value: 'volodymyr-husar-3b39398a',
            link: 'https://www.linkedin.com/in/volodymyr-husar-3b39398a/',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>',
          },
        },
      },
    ],
  },
  main: {
    sections: [
      {
        type: 'textBlock',
        name: 'Summary',
        data: {
          content:
            'A dedicated and detail-oriented QA Engineer with over 7 years of experience in software testing and quality assurance. Skilled in analyzing requirements, creating comprehensive test cases, and executing various types of tests to ensure software reliability and performance. Proven ability to work in fast-paced environments and collaborate effectively with development teams to identify and resolve defects. Committed to continuous learning and staying current with the latest testing tools and methodologies.',
        },
      },
      {
        type: 'timeline',
        name: 'Experience',
        data: {
          items: [
            {
              title: 'Brainstorm',
              duration: '04.2021 - 05.2022',
              details: [
                'Analyzing requirements and create user stories;',
                'Designing test cases/checklist',
                'Analyzing customer issues;',
                'API testing;',
                'Test execution (smoke, regression, exploratory, GUI, performance, functional);',
                'Analyzing incidents;',
                'Collecting quality metrics',
              ],
            },
            {
              title: 'Citrix',
              duration: '09.2018 - 04.2021',
              details: [
                'Documenting, writing requirements;',
                'Creating Test Cases, Test Suits, Test Plan, Epics, Stories, Tasks;',
                'Testing (GUI/exploratory/functional/regression);',
                'Configuring different servers/environments (CPS/CVAD/View/Antivirus/SQL Servers);',
                'Test execution (smoke, regression)',
              ],
            },
          ],
        },
      },
      {
        type: 'timeline',
        name: 'Education',
        data: {
          items: [
            {
              title: 'Lviv Polytechnic National University',
              duration: '09.2003-09.2008',
              details: ['Computer engineering'],
            },
          ],
        },
      },
    ],
  },
};

//Personal info rendering
function renderPersonalInfoSection(parentElement, sectionConfig) {
  const { data } = sectionConfig;
  const sectionEl = document.createElement('section');
  sectionEl.classList.add('section-img');

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
  const sectionEl = document.createElement('section');
  sectionEl.classList.add('section-contacts');
  sectionEl.innerHTML = '<h2>Contacts:</h2>';

  const contactList = document.createElement('ul');
  for (const key in data) {
    const contact = data[key];
    const listItem = document.createElement('li');
    listItem.innerHTML = `${key}: <a href = "${contact.link}">${contact.value}</a> ${contact.icon}`;
    contactList.appendChild(listItem);
  }
  sectionEl.appendChild(contactList);
  parentElement.appendChild(sectionEl);
}
// Text block - Summary rendering
function renderTextBlockSection(parentElement, sectionConfig) {
  const { name, data } = sectionConfig;
  const sectionEl = document.createElement('section');
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
  const sectionEl = document.createElement('section');
  sectionEl.classList.add(`section-${name.toLowerCase()}`);
  sectionEl.innerHTML = `<h2>${name}:</h2>`;

  const mainList = document.createElement('ul');
  data.items.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<h3>${item.title} ${
      item.duration ? item.duration : ''
    }</h3>`;
    if (item.details && item.details.length > 0) {
      const subList = document.createElement('ul');
      item.details.forEach((detail) => {
        const detailItem = document.createElement('li');
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

const renderersByType = {
  personInfo: renderPersonalInfoSection,
  personContacts: renderPersonalContactsSection,
  textBlock: renderTextBlockSection,
  timeline: renderTimelineSection,
};

function getRenderSectionFn(sectionType) {
  const renderFn = renderersByType[sectionType];
  if (!renderFn) {
    console.warn(`Unknown section type: ${sectionType}`);
  }
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
  headerEl.innerHTML = `<h1>${headerConfig.title}</h1>`;
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


let themeSwitch;

// Set the theme
function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.body.className = themeName; 
  if (themeSwitch) {
    themeSwitch.checked = themeName === 'dark-theme'; 
  }
}

// Toggle theme
function toggleTheme() {
  if (localStorage.getItem('theme') === 'dark-theme') {
    setTheme('light-theme');
  } else {
    setTheme('dark-theme');
  }
}


let settingsButton;
let settingsMenu;
let closeSidebarButton;
let sidebarOverlay;

// Function to open the settings
function openSettingsMenu() {
  document.body.classList.add('sidebar-open');
}

// Function to close the settings
function closeSettingsMenu() {
  document.body.classList.remove('sidebar-open');
}

//CV rendering based on config
function renderCV(config) {
  const headerEl = document.querySelector('header');
  const asideEl = document.querySelector('.left-column');
  const mainEl = document.querySelector('.right-column');
  const footerEl = document.querySelector('footer');

  renderHeader(headerEl, config.header);
  renderAside(asideEl, config.aside);
  renderMain(mainEl, config.main);
  renderFooter(footerEl, config.footer);
}

//When DOM oaded rendering
document.addEventListener('DOMContentLoaded', () => {

  themeSwitch = document.getElementById('checkbox'); //Initialize Theme Switcher

  // Add event listener for theme switcher
  if (themeSwitch) {
    themeSwitch.addEventListener('change', toggleTheme);
  } else {
    console.error("Theme switch checkbox with ID 'checkbox' not found.");
  }


  // Initialize theme and save to the Local storage
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    setTheme(savedTheme); // Apply saved theme
  } else if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    // Check users browser preference
    setTheme('dark-theme');
  } else {
    // Default to light theme
    setTheme('light-theme');
  }

  // Get settings menu elements
  settingsButton = document.querySelector('.settings-button');
  settingsMenu = document.getElementById('settingsMenu');
  closeSidebarButton = document.querySelector('.close-sidebar-button');
  sidebarOverlay = document.getElementById('sidebarOverlay');


  // Add event listeners for settings menu
  if (settingsButton) {
    settingsButton.addEventListener('click', openSettingsMenu);
  } else {
    console.error("Settings button not found.");
  }

  if (closeSidebarButton) {
    closeSidebarButton.addEventListener('click', closeSettingsMenu);
  } else {
    console.warn("Close settings menu button not found.");
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSettingsMenu);
  } else {
    console.warn("Settings menu overlay not found.");
  }

  // Render the CV after theme and settings set and initialize
  renderCV(config);
});