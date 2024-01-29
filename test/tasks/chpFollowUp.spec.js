const TestRunner = require('cht-conf-test-harness');
const harness = new TestRunner();
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
    let tasks = await harness.getTasks(contact,report);
    expect(tasks.length).toBe(1);
    expect(tasks[0].name).toBe('follow-up-household-member');
    expect(tasks[0].actions[0].form).toBe('cholera_suspicion_follow_up');
    expect(tasks[0].events[0].dueDate).toBeDefined();
});