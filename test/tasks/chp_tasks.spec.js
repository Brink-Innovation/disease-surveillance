const { expect } = require('chai');
const Harness = require('cht-conf-test-harness');
const harness = new Harness({ headless: true});
const {houseHoldAssessmentScenarios} = require('../forms/form_inputs')
const { DateTime } = require('luxon');
const now = DateTime.now();
const triggerForm = 'household_member_assessment';


describe('CHP Follow Up Task', () => {

before (async() => { return await harness.start()});
after (async() => { return await harness.stop()});
beforeEach(async() => { 
    return await harness.clear();
});
afterEach(async() => { expect(harness.consoleErrors).to.be.empty;});

it('should create follow up task for household member with case definition', async() =>{
    const initialResult = await harness.fillForm(`${triggerForm}`, [...houseHoldAssessmentScenarios.choleraCaseDefinition]);
    expect(initialResult.errors).to.be.empty;
    const tasks = await harness.getTasks();
    expect(tasks).to.have.property('length', 0);
});
});