import { useState } from "react";

export default function TokenForm() {
  const [tokenId, setTokenId] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [chain, setChain] = useState("zora");
  const [tokenData, setTokenData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/fetch-token?contractAddress=${contractAddress}&chain=${chain}&tokenId=${tokenId}`
      );
      const data = await response.json();
      console.log(data);
      setTokenData(data);
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
        <option value="zora">Zora</option>
        <option value="base">Base</option>
      </select>
      <button onClick={handleSubmit}>SUBMIT</button>

      {/* Display fetched data */}
      {tokenData && (
        <div className="mt-4">
          <h3>Token Name: {tokenData?.mintable?.token_name}</h3>
          <p>Description: {tokenData?.mintable?.collection?.description}</p>
          <img
            src={`https://magic.decentralized-content.com/ipfs/${
              tokenData?.media?.image_preview?.raw.split("ipfs://")[1]
            }`}
            alt="Token"
            style={{ height: "100px" }}
          />

          {/* Display mint context data */}
          {tokenData.mintable && (
            <div className="mt-2">
              <h4>Mint Context:</h4>
              <p>
                Price:{" "}
                {tokenData?.mintable?.mint_context?.price_per_token /
                  1000000000000000000}{" "}
                ETH
              </p>
              <p>
                ERC20 Address:{" "}
                {tokenData?.mintable?.mint_context?.erc20_z_address}
              </p>
              <p>
                Unipool {tokenData?.mintable?.mint_context?.uniswap_v3_pool}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
