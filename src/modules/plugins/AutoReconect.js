class AutoReconect extends _Plugin_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
                    constructor() {
                        super({
                            name: "auto-reconect",
                            description: "Automatically reloads the page after the connection is closed or the game could not be logged in",
                            once: true
                        })
                    }
                    execute() {
                        super.execute(() => {
                            location.reload()
                        })
                    }
                }
                
export default AutoReconect;
/***/
