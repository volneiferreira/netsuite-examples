/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define([],
  function () {
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     */
    function onRequest (context) {
      const assistant = serverWidget.createAssistant({ title: 'Assistant example' })

      const steps = {
        1: {
          step: assistant.addStep({
            id: 'step_one',
            label: 'Step 01'
          }),
          action: _buildStep01Page
        },
        2: {
          step: assistant.addStep({
            id: 'step_two',
            label: 'Step 02'
          }),
          action: _buildStep02Page
        },
        3: {
          step: assistant.addStep({
            id: 'step_three',
            label: 'Step 03'
          }),
          action: _buildStep03Page
        },
        finish: {
          action: _buildFinishPage
        },
        cancel: {
          action: _buildCancelPage
        }
      }

      _setStep(context.request, assistant, steps)

      context.response.writePage({
        pageObject: assistant
      })
    }

    /**
     * Build Step 01 page.
     *
     * @param serverRequest
     * @param assistant
     * @private
     */
    function _buildStep01Page (serverRequest, assistant) {
      // Add elements into assistant object.
    }

    /**
     * Build Step 02 page.
     *
     * @param serverRequest
     * @param assistant
     * @private
     */
    function _buildStep02Page (serverRequest, assistant) {
      // Add elements into assistant object.
    }

    /**
     * Build Step 03 page.
     *
     * @param serverRequest
     * @param assistant
     * @private
     */
    function _buildStep03Page (serverRequest, assistant) {
      // Add elements into assistant object.
    }

    /**
     * Build Finish page.
     *
     * @param serverRequest
     * @param assistant
     * @private
     */
    function _buildFinishPage (serverRequest, assistant) {
      // Add elements into assistant object.
    }

    /**
     * Build Cancel page.
     *
     * @param serverRequest
     * @param assistant
     * @private
     */
    function _buildCancelPage (serverRequest, assistant) {
      // Add elements into assistant object.
    }

    /**
     * Set step.
     *
     * @param serverRequest
     * @param assistant
     * @param steps
     * @private
     */
    function _setStep (serverRequest, assistant, steps) {
      if (serverRequest.method === 'GET') {
        const firstStep = steps[1]
        firstStep.action(serverRequest, assistant)
        assistant.currentStep = firstStep.step
      } else { // POST
        const lastAction = assistant.getLastAction()
        if (lastAction === serverWidget.AssistantSubmitAction.FINISH) {
          steps.finish.action(serverRequest, assistant)
        } else if (lastAction === serverWidget.AssistantSubmitAction.CANCEL) {
          steps.cancel.action(serverRequest, assistant)
        } else {
          assistant.currentStep = assistant.getNextStep()
          steps[assistant.currentStep.stepNumber].action(serverRequest, assistant, data)
        }
      }
    }

    return {
      onRequest: onRequest
    }
  })
