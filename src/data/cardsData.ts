// src/data/cardsData.ts

export interface CardType {
  id: string;
  name: string;
  image: string;
  matched: boolean;
}

export const cardsData: CardType[] = [
  { id: "1", name: "Printer", image: "/images/printer.png", matched: false },
  { id: "2", name: "Laptop", image: "/images/laptop.png", matched: false },
  { id: "3", name: "Meeting", image: "/images/meeting.png", matched: false },
  { id: "4", name: "Report", image: "/images/report.png", matched: false },
  { id: "5", name: "Coffee", image: "/images/coffee.png", matched: false },
  { id: "6", name: "Desk", image: "/images/desk.png", matched: false },
  { id: "7", name: "Manager", image: "/images/manager.png", matched: false },
  {
    id: "8",
    name: "Assistant",
    image: "/images/assistant.png",
    matched: false,
  },
  // Añade más tarjetas hasta alcanzar al menos 16 únicas
  { id: "9", name: "Notebook", image: "images/notebook.png", matched: false },
  { id: "10", name: "Chair", image: "/images/chair.png", matched: false },
  { id: "11", name: "Phone", image: "/images/phone.png", matched: false },
  { id: "12", name: "Tablet", image: "/images/tablet.png", matched: false },
  { id: "13", name: "Calendar", image: "/images/calendar.png", matched: false },
  { id: "14", name: "Clock", image: "/images/clock.png", matched: false },
  { id: "15", name: "File", image: "/images/file.png", matched: false },
  {
    id: "16",
    name: "Water Dispenser",
    image: "/images/waterdispenser.png",
    matched: false,
  },
];
