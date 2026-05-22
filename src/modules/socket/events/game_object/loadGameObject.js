import { cow } from "../../../../constants.js";
                function loadGameObject(content) {
                    const chunkSize = 8
                    for (let i = 0; i < content.length; i += chunkSize) {
                        const chunk = content.slice(i, i + chunkSize)
                        chunk[6] = cow.items.list[chunk[6]]
                        if (chunk[7] >= 0) {
                            chunk[7] = {
                                sid: chunk[7]
                            }
                        }
                        cow.objectsManager.add(...chunk)
                    }
                }
                
export default loadGameObject;
/***/
