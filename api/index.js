export default async (req, res) => {
  const { reqHandler } = await import('../dist/basic-app/server/server.mjs');
  return reqHandler(req, res);
};
