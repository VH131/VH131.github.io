// CV data configuration
window.config = {
  header: {
    title: "Volodymyr Husar CV",
    fullName: "Volodymyr Husar",
  },
  footer: {
    copyYear: "2025",
    author: "Volodymyr Husar",
  },
  aside: {
    sections: [
      {
        type: "personInfo",
        data: {
          fullName: "Volodymyr Husar",
          title: "QA Engineer",
          imgSrc: "./images/Panda.jpg",
          imgAlt: "Volodymyr Husar's face",
        },
      },
      {
        type: "personContacts",
        data: {
          email: {
            value: "vovagusar7@gmail.com",
            link: "mailto:vovagusar7@gmail.com",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>',
          },
          phone: {
            value: "+3806711111111",
            link: "tel:+380675867131",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>',
          },
          linkedin: {
            value: "volodymyr-husar-3b39398a",
            link: "https://www.linkedin.com/in/volodymyr-husar-3b39398a/",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>',
          },
        },
      },
    ],
  },
  main: {
    sections: [
      {
        type: "textBlock",
        name: "Summary",
        data: {
          content:
            "A dedicated and detail-oriented QA Engineer with over 7 years of experience in software testing and quality assurance. Skilled in analyzing requirements, creating comprehensive test cases, and executing various types of tests to ensure software reliability and performance. Proven ability to work in fast-paced environments and collaborate effectively with development teams to identify and resolve defects. Committed to continuous learning and staying current with the latest testing tools and methodologies.",
        },
      },
      {
        type: "timeline",
        name: "Experience",
        data: {
          items: [
            {
              title: "Brainstorm",
              duration: "04.2021 - 05.2022",
              details: [
                "Analyzing requirements and create user stories;",
                "Designing test cases/checklist",
                "Analyzing customer issues;",
                "API testing;",
                "Test execution (smoke, regression, exploratory, GUI, performance, functional);",
                "Analyzing incidents;",
                "Collecting quality metrics",
              ],
            },
            {
              title: "Citrix",
              duration: "09.2018 - 04.2021",
              details: [
                "Documenting, writing requirements;",
                "Creating Test Cases, Test Suits, Test Plan, Epics, Stories, Tasks;",
                "Testing (GUI/exploratory/functional/regression);",
                "Configuring different servers/environments (CPS/CVAD/View/Antivirus/SQL Servers);",
                "Test execution (smoke, regression)",
              ],
            },
          ],
        },
      },
      {
        type: "timeline",
        name: "Education",
        data: {
          items: [
            {
              title: "Lviv Polytechnic National University",
              duration: "09.2003-09.2008",
              details: ["Computer engineering"],
            },
          ],
        },
      },
    ],
  },
};
