export const modifiers = {
    "notIListed" : ["(address nftAddress, uint256 tokenId) {","Listing_installment memory listing = i_listings[nftAddress][tokenId];","if (listing.pricePerDay > 0) {","    revert AlreadyListed(nftAddress, tokenId);","}","_;"],
    "isIListed" : ["(address nftAddress, uint256 tokenId) {","Listing_installment memory listing = i_listings[nftAddress][tokenId];","if (listing.pricePerDay <= 0) {","    revert NotListed(nftAddress, tokenId);","}","_;"],
    "isOwner" : ["(address nftAddress,uint256 tokenId,address spender) {","IERC721 nft = IERC721(nftAddress);","address owner = nft.ownerOf(tokenId);","if (spender != owner) {","  revert NotOwner();","}","_;"],
    "notRListed" : ["(address nftAddress, uint256 tokenId) {","Listing_rent memory listing = r_listings[nftAddress][tokenId];","if (listing.pricePerDay > 0) {","   revert AlreadyListed(nftAddress, tokenId);","}","_;"],
    "isRListed" : ["(address nftAddress, uint256 tokenId) {","Listing_rent memory listing = r_listings[nftAddress][tokenId];","if (listing.pricePerDay <= 0) {","   revert NotListed(nftAddress, tokenId);","}","_;"],
    "notSListed" : ["(address nftAddress, uint256 tokenId) {","Listing_sell memory listing = s_listings[nftAddress][tokenId];","if (listing.price > 0) {"," revert AlreadyListed(nftAddress, tokenId);","}","_;"],
    "isSListed" : ["(address nftAddress, uint256 tokenId) {","Listing_sell memory listing = s_listings[nftAddress][tokenId];","if (listing.price <= 0) {"," revert NotListed(nftAddress, tokenId);","}","_;"]
}