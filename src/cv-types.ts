export interface PersonInfoSection {
  type: "personInfo";
  data: {
    fullName: string;
    title: string;
    imgSrc: string;
    imgAlt: string;
  };
  name?: string;
}

export interface PersonContactsSection {
  type: "personContacts";
  data: {
    email: {
      value: string;
      link: string;
      icon: string;
    };
    phone: {
      value: string;
      link: string;
      icon: string;
    };
    linkedin: {
      value: string;
      link: string;
      icon: string;
    };
  };
  name?: string;
}

export interface TextBlockSection {
  type: "textBlock";
  name?: string;
  data: {
    content: string;
  };
}

export interface TimelineSection {
  type: "timeline";
  name?: string;
  data: {
    items: {
      title: string;
      duration?: string;
      details?: string[];
    }[];
  };
}

export type CVSection =
  | PersonInfoSection
  | PersonContactsSection
  | TextBlockSection
  | TimelineSection;

export interface CVConfig {
  header: {
    title: string;
    fullName: string;
  };
  footer: {
    copyYear: string;
    author: string;
  };
  aside: {
    sections: CVSection[];
  };
  main: {
    sections: CVSection[];
  };
}
