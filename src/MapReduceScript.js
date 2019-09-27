/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/search', 'N/email'],
  function (search, email) {
	    /**
	     * Marks the beginning of the Map/Reduce process and generates input data.
	     *
	     * @typedef {Object} ObjectRef
	     * @property {number} id - Internal ID of the record instance
	     * @property {string} type - Record type id
	     *
	     * @return {Array|Object|Search|RecordRef} inputSummary
	     * @since 2015.1
	     */
	    function getInputData () {
	    	return search.create({
	    		type: search.Type.SALES_ORDER,
	    		filters: [{
	    			name: 'mainline',
	    			operator: search.Operator.IS,
	    			values: true
	    		}],
	    		columns: [{
	    			name: 'tranid'
	    		}, {
	    			name: 'entity'
	    		}]
	    	})
	    }

	    /**
	     * Executes when the map entry point is triggered and applies to each key/value pair.
	     *
	     * @param {MapSummary} context - Data collection containing the key/value pairs to process through the map stage
	     * @since 2015.1
	     */
	    function map (context) {
	    	const result = JSON.parse(context.value)

	    	const entityId = result.values.entity.value
	    	// const entityName = result.values['entity'].text;
	    	const tranid = result.values.tranid

	    	context.write({
					key: entityId,
					value: {
						tranid: tranid
					}
				})
	    }

	    /**
	     * Executes when the reduce entry point is triggered and applies to each group.
	     *
	     * @param {ReduceSummary} context - Data collection containing the groups to process through the reduce stage
	     * @since 2015.1
	     */
	    function reduce (context) {
	    	const entityId = context.key
	    	const entityTransactions = JSON.parse(context.value)

	    	entityTransactions.forEach(function (transaction) {
	    		const tranid = transaction.tranid
	    	})
	    }

	    /**
	     * Executes when the summarize entry point is triggered and applies to the result set.
	     *
	     * @param {Summary} summary - Holds statistics regarding the execution of a map/reduce script
	     * @since 2015.1
	     */
	    function summarize (summary) {
	    	email.send({
	    		author: 123, // Employee ID
	    		recipients: 'destinatario@gmail.com',
	    		subject: 'Assunto do e-mail',
	    		body: 'Olá Fulano, Sua tarefa foi finalizada!'
	    	})
	    }

	    return {
	        getInputData: getInputData,
	        map: map,
	        reduce: reduce,
	        summarize: summarize
	    }
  })
