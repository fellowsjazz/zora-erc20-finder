// pages/api/fetch-token.js

export default async function handler(req, res) {
  const { contractAddress, chain, tokenId } = req.query;

  try {
    const response = await fetch(
      `https://api.zora.co/discover/tokens/${chain.toUpperCase()}-MAINNET/${contractAddress}`
    );
    const data = await response.json();
    if (data.results && data.results.length >= tokenId) {
      const token = data.results[tokenId - 1];
      console.log(token);
      res.status(200).json(token);
    } else {
      res.status(404).json({ error: "Token not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
