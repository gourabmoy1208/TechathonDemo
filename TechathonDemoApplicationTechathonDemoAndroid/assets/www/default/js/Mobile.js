
/* JavaScript content from js/Mobile.js in folder common */
var busyIndicator = null;

var clientcard = null;
var accountList = null;
var accnt = null;
var acctValue = null;


function fetchAccountList() {
	
	WL.Logger.info("fetchAccountList");
	
	/*busyIndicator = new WL.BusyIndicator("accountBalanceContent",{text : "Loading..."});
	busyIndicator.show();*/
	
	
	var invocationData = {
			adapter : "AccountListAdapter",
			procedure : "getAccountListFromBackend",
			parameters : [clientcard]
	};
	
	var options = {
			onSuccess : success,
			onFailure : failure,
			invocationContext : { 'action' : 'test'}
	};
	
	WL.Client.invokeProcedure(invocationData, options);
}

function success(result) {
	WL.Logger.debug("success");
	var JSONResponseObject = result.invocationResult;
	accountList = JSONResponseObject.array;
	var sum = 0.00;
	var sum1 = 0;
	var sum2 =0;
	var sum3 = 0;
	//var Sum4 = 0;
	var totalSum = 0;
	$("#accountBalancesList").append("<li data-role='list-divider' style='background-color:#D2691E;font-style:Helvatica,Arial,Sans-Serif; color: white;' id='chqSav'>Chequing / Savings</li>");$("#accountBalancesList").listview("refresh");
	for(var index = 0; index < accountList.length; index++	) {
		if(accountList[index].attributes.Type =='Savings' || accountList[index].attributes.Type == 'Chequing'){
			$("#accountBalancesList").append("<li id='accountID"+index+"'>"+"<a class='ui-nodisc-icon ui-alt-icon' style='background-color:#F0DFDF;font-style:Helvatica,Arial,Sans-Serif;font-weight:normal;font-size:12px;' onclick='javascript:displayAccountDetails("+index+");'><b>"+accountList[index].attributes.Account_No+"</b><br />"+"CAD"+" "+(accountList[index].attributes.Balance).toLocaleString()+"</a></li>");
				sum=sum+accountList[index].attributes.Balance;
			$("#accountBalancesList").listview("refresh");
		}
	
	}
	$("#accountBalancesList").append("<li data-role='list-divider' style='background-color:#D2691E;font-style:Helvatica,Arial,Sans-Serif;color: white' id='chqSav'>Total: "+sum.toLocaleString()+"</li>");$("#accountBalancesList").listview("refresh");

	totalSum+=sum;

	$("#accountBalancesList").append("<li data-role='list-divider' style='background-color:#D2691E;font-style:Helvatica,Arial,Sans-Serif;color:white;' id='creditCards'>Credit Cards</li>");$("#accountBalancesList").listview("refresh");
	for(var index = 0; index < accountList.length; index++	) {
		if(accountList[index].attributes.Type == 'Credit Card') {
			
			sum1=sum1+accountList[index].attributes.Balance;;
			$("#accountBalancesList").append("<li  id='accountID"+index+"' >"+"<a class='ui-nodisc-icon ui-alt-icon' style='background-color:#F0DFDF;font-style:Helvatica,Arial,Sans-Serif;font-weight:normal;font-size:12px;' onclick='javascript:displayAccountDetails("+index+");'><b>"+accountList[index].attributes.Account_No+"</b><br />"+"CAD"+" "+(accountList[index].attributes.Balance).toLocaleString()+"</a></li>");
			$("#accountBalancesList").listview("refresh");
		}
	}
	$("#accountBalancesList").append("<li data-role='list-divider' style='background-color:#D2691E;font-style:Helvatica,Arial,Sans-Serif; color: white;' id='creditCards'>Total: "+sum1.toLocaleString()+"</li>");$("#accountBalancesList").listview("refresh");
	totalSum+=sum1;
	$("#accountBalancesList").append("<li data-role='list-divider'style='background-color:#D2691E;font-style:Helvatica,Arial,Sans-Serif; color: white;' id='loans'>Loans / Mortgages</li>");$("#accountBalancesList").listview("refresh");
	for(var index = 0; index < accountList.length; index++	) {
		if(accountList[index].attributes.Type == 'Loan') {

			sum2 =(accountList[index].attributes.Balance);
			$("#accountBalancesList").append("<li id='accountID"+index+"'>"+"<a class='ui-nodisc-icon ui-alt-icon' style='background-color:#F0DFDF;font-style:Helvatica,Arial,Sans-Serif;font-weight:normal;font-size:12px;' onclick='javascript:displayAccountDetails("+index+");'><b>"+accountList[index].attributes.Account_No+"</b><br />"+"CAD"+" "+(accountList[index].attributes.Balance).toLocaleString()+"</a></li>");
			$("#accountBalancesList").listview("refresh");
		}
	}
	$("#accountBalancesList").append("<li data-role='list-divider' style='background-color:#D2691E;font-style:Helvatica,Arial,Sans-Serif;color: white;' id='loans'>Total: "+sum2.toLocaleString()+"</li>");$("#accountBalancesList").listview("refresh");
	totalSum+=Math.abs(sum2);


	$("#accountBalancesList").append("<li data-role='list-divider' style='background-color:#D2691E;font-style:Helvatica,Arial,Sans-Serif;color: white;' id='investments'>Investments</li>");$("#accountBalancesList").listview("refresh");
	for(var index = 0; index < accountList.length; index++	) {
		if(accountList[index].attributes.Type == 'Investment') {
			sum3=(sum3)+(Math.abs(accountList[index].attributes.Balance));
			$("#accountBalancesList").append("<li id='accountID"+index+"'>"+"<a class='ui-nodisc-icon ui-alt-icon' style='background-color:#F0DFDF;font-style:Helvatica,Arial,Sans-Serif;font-weight:normal;font-size:12px;' onclick='javascript:displayAccountDetails("+index+");'><b>"+accountList[index].attributes.Account_No+"</b><br />"+"CAD"+" "+(accountList[index].attributes.Balance).toLocaleString()+"</a></li>");
			$("#accountBalancesList").listview("refresh");
		}
	}
	$("#accountBalancesList").append("<li data-role='list-divider' style='background-color:#D2691E;font-style:Helvatica,Arial,Sans-Serif;color: white;' id='investments'>Total: "+sum3.toLocaleString()+"</li>");$("#accountBalancesList").listview("refresh");
	totalSum+=Math.abs(sum3);

	$("#accountBalancesList").append("<li data-role='list-divider' style='background-color:#D2691E;font-style:Helvatica,Arial,Sans-Serif;color: white;' id='chqSav'>Grand Total: "+totalSum.toLocaleString()+"</li>");$("#accountBalancesList").listview("refresh");

	busyIndicator.hide();
}

function failure(result) {
	WL.Logger.debug("failure");
}

//Login JSON Object

function fetchLoginList() { 
	var username = $("#clientCardNumber").val();
	var password = $("#password").val();
	
	 if(password == '' || password == null || username == '' || username == null) {
		 $("#validationErrorPopup2").popup("open");
		 return;
	 }
	
	var invocationData = {
			adapter : 'LoginAdapter',
			procedure : 'getLOGINFromBackend',
			parameters : [username,password]
	};
	
	var options = {
			onSuccess : loginSuccess,
			onFailure : loginFailure,
			invocationContext : { 'action' : 'test'}
	};
	WL.Client.invokeProcedure(invocationData, options);
}

function loginSuccess(result){
	WL.Logger.on("success");
	var JSONResponseObject = result.invocationResult;
	
	if(JSONResponseObject.statusCode != "200") {
		loginFailure(result);
		return;
	}
	clientcard = JSONResponseObject.clientcard;
	loadPage("Banking.html");
}

function loginFailure(result) {
	WL.Logger.debug("failure");
	$("#validationErrorPopup").popup("open");
}

//Push Notification
function fetchPushMessage() { 
	WL.Logger.info("fetchPushMessage");
	var invocationData = {
			adapter : 'PushAdaptor',
			procedure : 'getPushMessage',
			parameters : []
			
	};
	
	var options = {
			onSuccess : pushSuccess,
			onFailure : pushFailure,
			invocationContext : { 'action' : 'test'}
	};
	WL.Client.invokeProcedure(invocationData, options);
}

function pushSuccess(result){
	WL.Logger.on("success");
	var JSONResponseObject = result.invocationResult;
	
}

function pushFailure(result) {
	WL.Logger.debug("failure");
	
}




function fetchAccountArrayList() {
	WL.Logger.info("fetchAccountArrayList");
	
	busyIndicator = new WL.BusyIndicator("AppBody");
	busyIndicator.show();
	
	var invocationData = {
			adapter : "AccountListAdapter",
			procedure : "getAccountListFromBackend",
			parameters : []
	};
	
	var options = {
			onSuccess : accountSuccess,
			onFailure : accountFailure,
			invocationContext : { 'action' : 'test'}
	};
	
	WL.Client.invokeProcedure(invocationData, options);
}

function accountSuccess(result) {
	WL.Logger.debug("success");
	var JSONResponseObject = result.invocationResult;
	accountList = JSONResponseObject.object;
	//var accountList = JSONResponseObject._meta;
	for(var index = 0; index < accountList.length; index++	) {
		if(accountList[index].className == 'CLIENT_ACCT_BAL_1') {
			if(accountList[index].attributes.Type =='Savings' || accountList[index].attributes.Type == 'Chequing')
				$("#chqSav").append("<li><a href='Account Details.html'>"+accountList[index].attributes.Account_No+"-</t>"+accountList[index].attributes.Balance+"<b></b></a></li>");
			else if(accountList[index].attributes.Type == 'Credit Card')
				$("#creditCards").append("<li><a href='Account Details.html'>"+accountList[index].attributes.Account_No+"-</t>"+accountList[index].attributes.Balance+"<b></b></a></li>");
			else if(accountList[index].attributes.Type == 'Loan')
				$("#loans").append("<li><a href='Account Details.html'>"+accountList[index].attributes.Account_No+"-</t>"+accountList[index].attributes.Balance+"<b></b></a></li>");
		}
	}
	$("#loadAccountLink").hide();
	busyIndicator.hide();
	$("#accountBalancesList").show();
}

function accountFailure(result) {
	WL.Logger.debug("failure");
	busyIndicator.hide();
}


/*$(document).on('pagebeforeshow', '#index', function(){       
    $(document).on('click', '#change-page-button', function(){     
        // store some data
        storeObject.firstname = 'Dragan';
        storeObject.lastname = 'Gaic';
        //Change page
        $.mobile.changePage("#second");
    });    
});

$(document).on('pagebeforeshow', '#second', function(){     
    //alert('My name is ' + storeObject.firstname + ' ' + storeObject.lastname);
});

// Store object
var storeObject = {
    firstname : '',
    lastname : ''
};*/

function loadPage(pageName) {
	$.mobile.changePage( pageName, { transition: "fade"} );
}

function displayAccountDetails(accountName, balance) {
	//alert("1st");
	$("#accountName").html("<b>"+accountName+"</b><t>"+balance+"</t>");
	
}

function populateAccountListForFundsTransfer() {
	//if(accountList == null || accountList.length == 0) {
		var invocationData = {
				adapter : "AccountListAdapter",
				procedure : "getAccountListFromBackend",
				parameters : [clientcard]
		};
		
		var options = {
				onSuccess : populateAccountDropDownForFundsTransferSuccess,
				onFailure : failure,
				invocationContext : { 'action' : 'test'}
		};
		
		WL.Client.invokeProcedure(invocationData, options);
	//}
}

function populateAccountDropDownForFundsTransferSuccess(result) {
	var JSONResponseObject = result.invocationResult;
	accountList = JSONResponseObject.array;
	for(var index = 0; index < accountList.length; index++) {
		if(accountList[index].attributes.Type == "Savings" || accountList[index].attributes.Type == "Chequing" || accountList[index].attributes.Type == "Credit Card"){
			$("#fromDropDown").append("<option>"+accountList[index].attributes.Account_No+" - "+ accountList[index].attributes.Balance);
			$("#toDropDown").append("<option>"+accountList[index].attributes.Account_No+" - "+ accountList[index].attributes.Balance);
		}
	}
	
}

function displayAccountDetails(accountIndex){
	accnt = $("#accountID"+accountIndex).text();
	$.mobile.changePage("Account Details.html", {transition: "slide"});

	$(document).on('pagebeforeshow', '#accountDetailsPage', function(){    
	    // Add a new select element
		$('[data-role="content"]').html('');
	    $('[data-role="content"]').append('<p>'+accnt+'</p>');
	    /*$('[data-role="content"]').append('<input type="range" name="slider-1" id="slider-1" value="60" min="0" max="100" />');
	    $('[data-role="content"]').append('<input type="search" name="search" id="search-basic" value="" />');
	    $('[data-role="content"]').append('<input type="button" value="Press me"/>');*/    
	    // Enhance new select element
	    $('[data-role="content"]').trigger('create');
	});

	//transitionToAccountDetails();
	/*$("#accountDetail").append("<li>"+accnt+"</li>");
	$("#accountDetail").listview("refresh");*/

	//$.mobile.loading('hide');
}


function submitFundTransferRequest() {
	WL.Logger.info("fetchFundTransferList");
	
	var fromAccount = $("#fromAccount").html();
	var toAccount = $("#toAccount").html();
	var amount = $("#amountConfirm").html();
	
	var invocationData = {
			adapter : "FundTransferAdapter",
			procedure : "getJSONFundTransferFromBackend",
			parameters : [clientcard, fromAccount, toAccount, amount]
	};
	
	var options = {
			onSuccess : fundTransferSuccess,
			onFailure : fundFailure,
			invocationContext : { 'action' : 'test'}
	};
	
	WL.Client.invokeProcedure(invocationData, options);
}


function fundTransferSuccess(result){
	WL.Logger.on("success");
	var JSONResponseObject = result.invocationResult;
	
	if(JSONResponseObject.statusCode != "200") {
		fundFailure(result);
		return;
	}
	
	fetchPushMessage();
	var confirmationNo = JSONResponseObject.Confirmation_Number;
	var fromaccount = JSONResponseObject.from;
	var toaccount = JSONResponseObject.to;
	var amount = JSONResponseObject.amount;
	var fromAccountNewBalance = JSONResponseObject.newBalance_From_Acct;
	
	$.mobile.changePage("Fund Transfer Complete.html", {transition: "slide"});
	
	
	$(document).on('pagebeforeshow', '#fundTransferCompletePage', function(){    
	    // Add a new select element
		var pageHtml = $('#fundTransferCompletionDiv').html();
		$('[data-role="content"]').html('');
	    $('[data-role="content"]').append('<table style="background-color:#F0DFDF" width="100%" class="ui-mini">');
	    $('[data-role="content"]').append('<tr><td class="ui-mini"><b>Confirmation #:</b></td><td align="right" class="ui-mini">'+confirmationNo+'</td></tr>');
	    $('[data-role="content"]').append('<tr><td class="ui-mini"><b>From:</b></td><td align="right" class="ui-mini">'+fromaccount+'</td></tr>');
	    //$('[data-role="content"]').append('<tr><td class="ui-mini"><b>Current Balance:</b></td><td align="right" class="ui-mini">'+fromAccountNewBalance+'</td></tr>');
	    $('[data-role="content"]').append('<tr><td class="ui-mini"><b>To:</b></td><td align="right" class="ui-mini">'+toaccount+'</td></tr>');
	    //$('[data-role="content"]').append('<tr><td class="ui-mini"><b>Current Balance:</b></td><td align="right" class="ui-mini">N/A</td></tr>');
	    $('[data-role="content"]').append('<tr><td class="ui-mini"><b>Amount Debited/Credited:</b></td><td align="right" class="ui-mini">'+amount+'</td></tr>');
	    $('[data-role="content"]').append('</table><br/><br/>');
	    $('[data-role="content"]').append('<div style="background-color: #CCDBE5;" class="ui-mini" id="fundTransferCompletionDiv">'+pageHtml+'</div>');
		
	    $('[data-role="content"]').trigger('create');
	});
	
}

function fundFailure(result) {
	WL.Logger.debug("failure");
	$("#validationErrorPopup").popup("open");
}


function transferFunds(){
	var fromAccount = $("#fromDropDown").val();
	var toAccount = $("#toDropDown").val();
	var amount = $("#amount").val();

	$.mobile.changePage("Confirm Fund Transfer.html", {transition: "slide"});
	
	var fromAccountNumber = extractAccountNumber(fromAccount);
	var toAccountNumber = extractAccountNumber(toAccount);
	
	$(document).on('pagebeforeshow', '#fundTransferConfirmationPage', function(){    
	    // Add a new select element
		var pageHtml = $('#buttonTableDiv').html();
		$('[data-role="content"]').html('');
	    $('[data-role="content"]').append('<div class="ui-grid-solo">');
	    $('[data-role="content"]').append('<div class="ui-block-a ui-mini" id="AppBodyFundTransfer">');
	    $('[data-role="content"]').append('<div class="ui-mini"><b>From:</b></div><div id="fromAccount" class="ui-mini">'+ fromAccountNumber+'</div><br />');
	    $('[data-role="content"]').append('<div class="ui-mini"><b>To:</b></div><div id="toAccount" class="ui-mini">'+toAccountNumber+'</div><br/>');
	    $('[data-role="content"]').append('<div class="ui-mini"><b>Amount:</b></div><div id="amountConfirm" class="ui-mini">'+amount+'</div></div><br /><br />');
	    $('[data-role="content"]').append('<div id="buttonTableDiv">'+pageHtml+'</div>');
	    
	    $('[data-role="content"]').trigger('create');
	});
	
	/*$("#fromAccount").html(fromAccountNumber);
	$("#toAccount").html(toAccountNumber);
	$("#amountConfirm").html(amount);*/
	
	

}

function extractAccountNumber(accountName) {
	for(var index = 0; index < accountList.length; index++	) {
		var accountNo = accountList[index].attributes.Account_No;
		var accountNameStr = new String(accountName);
		if(accountNameStr.search(accountNo) != -1) {
			return accountNo;
		}
	}
	
}

function reload(){
	//Show busy indicator. Will work regardless of a environment
	busy.show();
	
	//Set timeout for 5 seconds and reload application using WL API
	setTimeout(WL.Client.reloadApp, 3000);
}



 $('#page').load("Login.html", function() {
	console.log("In login callback");
			MQA.bug();
});  