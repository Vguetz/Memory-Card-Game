// src/data/cardsData.ts

export interface CardType {
  id: string;
  name: string;
  image: string;
  matched: boolean;
}

const baseUrl = import.meta.env.BASE_URL;

export const cardsData: CardType[] = [
  {
    id: "1",
    name: "Printer",
    image: `${baseUrl}images/printer.png`,
    matched: false,
  },
  {
    id: "2",
    name: "Laptop",
    image: `${baseUrl}images/laptop.png`,
    matched: false,
  },
  {
    id: "3",
    name: "Meeting",
    image: `${baseUrl}images/meeting.png`,
    matched: false,
  },
  {
    id: "4",
    name: "Report",
    image: `${baseUrl}images/report.png`,
    matched: false,
  },
  {
    id: "5",
    name: "Coffee",
    image: `${baseUrl}images/coffee.png`,
    matched: false,
  },
  { id: "6", name: "Desk", image: `${baseUrl}images/desk.png`, matched: false },
  {
    id: "7",
    name: "Manager",
    image: `${baseUrl}images/manager.png`,
    matched: false,
  },
  {
    id: "8",
    name: "Assistant",
    image: `${baseUrl}images/assistant.png`,
    matched: false,
  },
  {
    id: "9",
    name: "Notebook",
    image: `${baseUrl}images/notebook.png`,
    matched: false,
  },
  {
    id: "10",
    name: "Chair",
    image: `${baseUrl}images/chair.png`,
    matched: false,
  },
  {
    id: "11",
    name: "Phone",
    image: `${baseUrl}images/phone.png`,
    matched: false,
  },
  {
    id: "12",
    name: "Tablet",
    image: `${baseUrl}images/tablet.png`,
    matched: false,
  },
  {
    id: "13",
    name: "Calendar",
    image: `${baseUrl}images/calendar.png`,
    matched: false,
  },
  {
    id: "14",
    name: "Clock",
    image: `${baseUrl}images/clock.png`,
    matched: false,
  },
  {
    id: "15",
    name: "File",
    image: `${baseUrl}images/file.png`,
    matched: false,
  },
  {
    id: "16",
    name: "Water Dispenser",
    image: `${baseUrl}images/waterdispenser.png`,
    matched: false,
  },
];
