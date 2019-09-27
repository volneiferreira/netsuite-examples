/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget'],
  function (serverWidget) {
	    /**
	     * Definition of the Suitelet script trigger point.
	     *
	     * @param {Object} context
	     * @param {ServerRequest} context.request - Encapsulation of the incoming request
	     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
	     * @Since 2015.2
	     */
	    function onRequest (context) {
	    	const serverRequest = context.request
	    	const serverResponse = context.response
	    	const parameters = serverRequest.parameters

	    	const form = serverWidget.createForm({ title: 'Meu primeiro Suitelet' })

	    	if (serverRequest.method === 'GET') {
	    		const textField = form.addField({
	    		    id: 'custpage_campo_texto',
	    		    type: serverWidget.FieldType.TEXT,
	    		    label: 'Campo texto'
	    		})

	    		textField.isMandatory = true

	    		form.addField({
	    			id: 'custpage_json_hidden',
	    		    type: serverWidget.FieldType.LONGTEXT,
	    		    label: 'JSON Hidden'
	    		})
	    		    .updateDisplayType({
	    		        displayType: serverWidget.FieldDisplayType.HIDDEN
	    		    })
	    		    .defaultValue = JSON.stringify(parameters)

	    		form.addSubmitButton({
	    			label: 'Enviar'
	    		})
		    } else { // POST
		    	const textFieldValue = parameters.custpage_campo_texto
		    	const jsonFieldValue = JSON.parse(parameters.custpage_json_hidden)

		    	// Save the data sent or anything you want!

		    	form.addField({
	    			id: 'custpage_inlinehtml',
	    		    type: serverWidget.FieldType.INLINEHTML,
	    		    label: 'JSON Hidden'
	    		})
	    		    .defaultValue = '<p>Dados salvos com sucesso!</p>'
		    }

	    	serverResponse.writePage({
	    		pageObject: form
	        })
	    }

	    return {
	        onRequest: onRequest
	    }
  })
