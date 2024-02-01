const { expect } = require('chai');
const TestHarness = require('cht-conf-test-harness');
const formName = 'household_member_assessment';
const harness = new TestHarness();

describe('Household Member Assessment Form Test', () => {
    before(async () => {
        return await harness.start();
    });
    after(async () => {
        return await harness.stop();
    });
    beforeEach(async () => {
        await harness.clear();
        return await harness.setNow('2023-08-24');
    });
    afterEach(() => {
        expect(harness.consoleErrors).to.be.empty;
    });

    it(`${formName} form can be loaded`, async () => {
        await harness.loadForm(`${formName}`);
        expect(harness.state.pageContent).to.include(`${formName}`);
    });
    it(`${formName} form can be filled for no cholera case definition`, async () => {
        const result = await harness.fillForm(`${formName}`, ['no']);
        expect(result.errors).to.be.empty;
        expect(result.report.fields).to.deep.include({
            patient_name: 'Patient Name',
            household_member_assessment: {
                initial_symptoms: 'no',
                advice_note: ''
            },
            group_review: {
                summary_name: '',
                complete_action: '',
                all_patient_details: '',
                name_of_patient: '',
                age_of_patient: '',
                the_finding: '',
                advise: ''
            }
        })
    });
    it(`${formName} form can be filled for yes cholera case definition`, async () => {
        const result = await harness.fillForm(`${formName}`, ['yes','acute watery diarrhea','4','yes', 'no', 'yes', 'no','no', 'worsening']);
        expect(result.errors).to.be.empty;
        expect(result.report.fields).to.deep.include({
            patient_name: 'Patient Name',
            household_member_assessment: {
                initial_symptoms: 'yes',
                crucial_symptoms: 'acute watery diarrhea',
                duration: '4',
                symptoms: '',
                dehydration: 'yes',
                muscle_cramps: 'no',
                rapid_heart_rate: 'yes',
                low_blood_pressure: 'no',
                shock: 'no',
                patient_well_being: 'worsening'
              },
        })
    });
});
