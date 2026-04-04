export interface Speaker {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  country: string;
  talkTitle: string;
  bio: string;
  imageUrl: string;
}

export const speakers: Speaker[] = [
  {
    id: "speaker-1",
    name: "TBA",
    title: "Professor",
    affiliation: "To be announced",
    country: "Japan",
    talkTitle: "Keynote: To be announced",
    bio: "Details will be announced soon.",
    imageUrl: "/images/speakers/placeholder.jpg",
  },
  {
    id: "speaker-2",
    name: "TBA",
    title: "Professor",
    affiliation: "To be announced",
    country: "Vietnam",
    talkTitle: "Keynote: To be announced",
    bio: "Details will be announced soon.",
    imageUrl: "/images/speakers/placeholder.jpg",
  },
  {
    id: "speaker-3",
    name: "TBA",
    title: "Professor",
    affiliation: "To be announced",
    country: "Korea",
    talkTitle: "Keynote: To be announced",
    bio: "Details will be announced soon.",
    imageUrl: "/images/speakers/placeholder.jpg",
  },
];
