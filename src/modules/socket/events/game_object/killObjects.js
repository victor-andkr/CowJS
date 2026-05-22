import { cow } from "../../../../constants.js";
                function killObjects(sid) {
                    if (!sid) return
                    cow.objectsManager.disableAllObjects(sid)
                }
                
export default killObjects;
/***/
