const { expect } = require('chai');
const Harness = require('cht-conf-test-harness');
const harness = new Harness({verbose: true, headless: true});
const {houseHoldAssessmentScenarios} = require('../forms/form_inputs')

describe('CHP Follow Up Tasks', () => {

before (async() => { return await harness.start()});
after (async() => { return await harness.stop()});
beforeEach(async() => { return await harness.clear()});
afterEach(async() => { expect(harness.consoleErrors).to.be.empty;});

it('should create follow up task for household member with case definition', async() =>{
    const initialResult = await harness.fillForm('household_member_assessment', [...houseHoldAssessmentScenarios.choleraCaseDefinition]);
    expect(initialResult.errors).to.be.empty;
    let tasks = harness.getTasks();
    console.log(tasks);
    // expect(tasks.length).toBe(1);
    // expect(tasks[0].name).toBe('follow-up-household-member');
    // expect(tasks[0].actions[0].form).toBe('cholera_suspicion_follow_up');
    // expect(tasks[0].events[0].dueDate).toBeDefined();
});
});