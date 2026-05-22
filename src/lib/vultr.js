/**
 * Server region helpers — matches assets-eb87bff7.js (ze.prototype.stripRegion).
 */
export function stripRegion(regionId) {
  if (typeof regionId !== "string") return regionId;
  const { regionPrefix, digitalOceanPrefix } = getVultrConfig();
  if (regionId.startsWith(regionPrefix)) return regionId.slice(regionPrefix.length);
  if (regionId.startsWith(digitalOceanPrefix)) return regionId.slice(digitalOceanPrefix.length);
  return regionId;
}

export function parseServerQuery(serverParam) {
  const params = new URLSearchParams(location.search);
  const raw = serverParam ?? params.get("server");
  if (typeof raw !== "string" || !raw.length) return null;
  const [region, game] = raw.split(":");
  return {
    region: stripRegion(region),
    gameIndex: game,
    password: params.get("password"),
    wssPath: `wss://${stripRegion(region)}`,
  };
}

export function getVultrConfig() {
  return (
    window.Cow?.config?.vultr ?? {
      regionPrefix: "vultr:",
      digitalOceanPrefix: "do:",
    }
  );
}

export function resolveApiBase(hostname = location.hostname) {
  const v = getVultrConfig();
  if (hostname === "sandbox-dev.moomoo.io" || hostname === "sandbox.moomoo.io")
    return v.defaultApiSandbox ?? "https://api-sandbox.moomoo.io";
  if (hostname === "dev.moomoo.io" || hostname === "dev2.moomoo.io")
    return v.defaultApiDev ?? "https://api-dev.moomoo.io";
  return v.defaultApiProd ?? "https://api.moomoo.io";
}
