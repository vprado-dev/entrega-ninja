export const parseJwt = (token: string): Record<string, any> => {
  const jwtData = token.split(".")[1];
  const jwtBuffer = Buffer.from(jwtData, "base64");
  const jwtString = jwtBuffer.toString("ascii");
  const jwtObject = JSON.parse(jwtString);

  return jwtObject;
};
