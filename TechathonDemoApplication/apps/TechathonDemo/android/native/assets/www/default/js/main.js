
/* JavaScript content from js/main.js in folder common */
var busy;
function wlCommonInit(){

	/*
	 * Application is started in offline mode as defined by a connectOnStartup property in initOptions.js file.
	 * In order to begin communicating with Worklight Server you need to either:
	 * 
	 * 1. Change connectOnStartup property in initOptions.js to true. 
	 *    This will make Worklight framework automatically attempt to connect to Worklight Server as a part of application start-up.
	 *    Keep in mind - this may increase application start-up time.
	 *    
	 * 2. Use WL.Client.connect() API once connectivity to a Worklight Server is required. 
	 *    This API needs to be called only once, before any other WL.Client methods that communicate with the Worklight Server.
	 *    Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here
	
	/*MQA.startSession({
	//Required for IBM Worklight Quality Assurance
   // host: '9.124.205.127:10080',
    versionName: "1.0", // app release version
    android: {
        applicationKey: "9b23a0dcec00f1519a4baedafce9d50ba4bf33ff",
        versionNumber: "1" // app version number
    },
    ios: {
        applicationKey: "<iOS MQA application key>",
        versionNumber: "1.0" // app version number
    }
});*/


MQA.startSession({
    // ...the required parameters are indicated earlier
	 versionName: "1.0", // app release version
        android: {
            applicationKey: "6e809fb20eb34a8671da8cf8b5072fae8a846ac2",
            versionNumber: "1" // app version number
        },
    // or "MARKET_MODE" or "SILENT_MODE"
    mode: "QA_MODE",
    protocol: 'https', // or 'http'
    // Enable problem reporting with a shake.
     shake: true     });

MQA.startSession({
      // ...
 }, function(MQAObj) {
     // MQA is ready to work here.
 });


MQA.log();
MQA.info();
MQA.warn();
MQA.error();

MQA.feedback();
//MQA.bug();

MQA.isReady();
MQA.isSetUp();



	

}
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}