import fetch from "node-fetch";
import URLS from "../utils/URL";
import { JSDOM } from "jsdom";
import { getInfos } from "../utils/getInfos";

export const fetchTrackingService = async (code: string) => {
  const api = new URL(`${URLS.API_RASTREAR}`);
  api.searchParams.append("user", process.env.CORREIOS_USER || "");
  api.searchParams.append("token", process.env.CORREIOS_TOKEN || "");
  api.searchParams.append("codigo", code);

  const rastreioResponse = await fetch(api.toString());

  const body = await rastreioResponse.json();
  console.log({ eventos: body.eventos });
  return body.objetos[0];
};

export const fetchTrackingServiceV2 = async (code: string) => {
  const response = await fetch(
    `https://www.muambator.com.br/pacotes/${code}/detalhes`,
  );
  const html = await response.text();

  const dom = new JSDOM(html);

  const lastUpdate = getInfos(dom);

  return lastUpdate;
};
