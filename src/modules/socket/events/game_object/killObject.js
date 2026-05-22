import { cow } from "../../../../constants.js";
                function killObject(sid) {
                    const gameObject = cow.objectsManager.getById(sid)
                    if (!gameObject) return
                    gameObject.setActive(false)
                }
                
export default killObject;
/***/
