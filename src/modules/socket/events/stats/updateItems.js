import { cow } from "../../../../constants.js";
                function updateItems(data, isWeapon) {
                    if (!data?.length) return
                    const type = isWeapon ? "weapons" : "items"
                    cow.player[type] = data
                }
                
export default updateItems;
/***/
