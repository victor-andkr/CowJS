import { cow } from "../../../../constants.js";
                function wiggleGameObject(dir, sid) {
                    const gameObject = cow.objectsManager.getById(sid)
                    if (!gameObject) return
                    gameObject.doWiggle(dir)
                }
                
export default wiggleGameObject;
/***/
