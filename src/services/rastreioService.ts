import NodeCache from "node-cache";
import fetch from "node-fetch";
import { parseJwt } from "../utils/parseJwt";
import URL from "../utils/URL";

const tokenCache = new NodeCache();

const getToken = async () => {
  let tokenObj: any = tokenCache.get("token");
  if (tokenObj && tokenObj.expirationDate > Date.now()) {
    return tokenObj;
  }
  const response = await fetch(URL.PROXYAPP_TOKEN, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "user-agent": "Dart/2.18 (dart:io)",
    },
    body: JSON.stringify({
      requestToken: process.env.REQUEST_TOKEN,
    }),
  });

  const body = await response.json();
  const jwtObject = parseJwt(body.token);
  tokenObj = {
    token: body.token,
    expirationDate: jwtObject.exp * 1000 - 120000,
  };

  tokenCache.set("token", tokenObj);

  return tokenObj;
};

export const fetchTrackingService = async (code: string) => {
  const tokenObj = await getToken();

  const rastreioResponse = await fetch(`${URL.PROXYAPP_RASTREAR}/${code}`, {
    headers: {
      "content-type": "application/json",
      "user-agent": "Dart/2.18 (dart:io)",
      "app-check-token": tokenObj.token,
    },
  });

  const body = await rastreioResponse.json();

  return body.objetos[0];
};
