import { useState } from "react";

export default function TokenForm() {
  const [tokenId, setTokenId] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [chain, setChain] = useState("base");
  const [tokenData, setTokenData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.zora.co/discover/tokens/${chain.toUpperCase()}-MAINNET/${contractAddress}`
      );
      const data = await response.json();
      if (data.results && data.results.length >= tokenId) {
        const token = data.results[tokenId - 1];
        console.log("token data", token);
        setTokenData(token);
      } else {
        console.error("Token ID out of bounds or no results found.");
        setTokenData(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = () => {
    fetchData();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Contract Address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
        className="p-2 border rounded"
      />
      <select
        value={chain}
        onChange={(e) => setChain(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="base">Base</option>
        <option value="zora">Zora</option>
      </select>
      <button onClick={handleSubmit}>SUBMIT</button>

      {/* Display fetched data */}
      {tokenData && (
        <div className="mt-4">
          <h3>Token Name: {tokenData.mintable.token_name}</h3>
          <p>Description: {tokenData.mintable.collection.description}</p>
          <img
            src={tokenData.media.image_preview.encoded_thumbnail}
            alt="Token"
          />

          {/* Display mint context data */}
          {tokenData.mintable?.mint_context && (
            <div className="mt-2">
              <h4>Mint Context:</h4>
              <p>
                Price: {tokenData.mintable.mint_context.price_per_token} ETH
              </p>
              <p>
                ERC20 Address: {tokenData.mintable.mint_context.erc20_z_address}
              </p>
              <p>
                Unipool: {tokenData.mintable.mint_context.uniswap_v3_pool}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
