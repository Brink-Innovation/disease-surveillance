const { expect } = require('chai');
const TestHarness = require('cht-conf-test-harness');
const formName = 'household_member_assessment';
const harness = new TestHarness();

describe('Househld Member Assessment Form Test', () => {
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
});
