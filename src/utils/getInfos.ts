import { JSDOM } from "jsdom";

export const getInfos = (dom: JSDOM) => {
  const lastUpdate: any = {};

  const timeline = dom.window.document.querySelector(".milestones");

  const event = timeline?.querySelector("li");

  const eventStatus = event?.querySelector("strong")?.textContent?.trim();
  lastUpdate.descricao = eventStatus;
  const eventLocation = event
    ?.querySelector("strong + br")
    ?.nextSibling?.textContent?.trim();
  lastUpdate.unidade = eventLocation;
  if (eventStatus && eventStatus.includes("Em trânsito")) {
    const [status, destination] = eventStatus.split("para");
    lastUpdate.descricao = status;
    lastUpdate.unidadeDestino = destination;
  }

  const eventDateTime = event?.querySelector(".out")?.textContent?.split(" ");
  lastUpdate.dtHrCriado = eventDateTime;

  return lastUpdate;
};
