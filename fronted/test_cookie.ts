function extractCookieValue(setCookieHeaderStr: string, name: string): string | null {
  const searchStr = name + "=";
  const startIdx = setCookieHeaderStr.indexOf(searchStr);
  if (startIdx === -1) return null;
  
  const valueStart = startIdx + searchStr.length;
  let endIdx = setCookieHeaderStr.indexOf(";", valueStart);
  if (endIdx === -1) {
    endIdx = setCookieHeaderStr.length;
  }
  
  let value = setCookieHeaderStr.slice(valueStart, endIdx).trim();
  if (value.endsWith(",")) {
    value = value.slice(0, -1).trim();
  }
  return value;
}

const header = "refreshToken=NEW_RT; Path=/; HttpOnly, accessToken=NEW_AT; Path=/; HttpOnly";
console.log("RT:", extractCookieValue(header, "refreshToken"));
console.log("AT:", extractCookieValue(header, "accessToken"));
