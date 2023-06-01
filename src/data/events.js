const events = {
    "INSNFTListed" : ["address indexed owner", "address indexed user", "address indexed nftContract", "uint256 tokenId", "uint256 pricePerDay"],
    "NFTINSPaid" : ["address indexed owner", "address indexed user", "address indexed nftContract", "uint256 tokenId", "uint64 expires", "uint64 insCount", "uint64 insIndex","uint256 insAmount", "uint256 totalPaid"],
    "NFTUnlisted" : ["address indexed unlistSender", "address indexed nftContract", "uint256 indexed tokenId"],
    "NFTRented" : ["address indexed owner", "address indexed user", "address indexed nftContract", "uint256 tokenId", "uint64 expires", "uint256 rentalFee"],
    "ItemListed" : ["address indexed seller","address indexed nftAddress","uint256 indexed tokenId","uint256 price"],
    "ItemCanceled" : ["address indexed seller","address indexed nftAddress","uint256 indexed tokenId"],
    "ItemBought" : ["address indexed buyer","address indexed nftAddress","uint256 indexed tokenId","uint256 price"]
}

export default events;