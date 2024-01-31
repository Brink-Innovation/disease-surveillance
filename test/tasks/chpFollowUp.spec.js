const chai = import('chai')
const expect = chai.expect;
const Harness = require('cht-conf-test-harness');
const harness = new Harness({verbose: true});

describe('CHP Follow Up Tasks', () => {

before (async() => { return await harness.start()});
after (async() => { return await harness.stop()});
beforeEach(async() => { return await harness.clear()});
afterEach(async() => { expect(harness.consoleErrors).to.be.empty;});

it('should create follow up task for household member', async() =>{
    let report = {
        form: 'household_member_assessment',
        fields: {
            initial_symptoms: 'yes'
        },
        reported_date: new Date().getTime()
    };
    let contact = {
        contact_type: 'community_health_volunteer'
    };
    let tasks = harness.getTasks(contact,report);
    expect(tasks.length).toBe(1);
    expect(tasks[0].name).toBe('follow-up-household-member');
    expect(tasks[0].actions[0].form).toBe('cholera_suspicion_follow_up');
    expect(tasks[0].events[0].dueDate).toBeDefined();
});
});