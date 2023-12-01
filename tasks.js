const extras = require('./nools-extras');
const {
    getField,
} = extras;
module.exports = [
{
    name: 'follow-up-household-member',
    title: 'Follow up household member',
    icon: 'icon-healthcare-assessment',
    appliesTo: 'reports',
    appliesToType: ['household_member_assessment'],
    appliesIf: function(contact, report){
        let userHasDangerSigns = getField(report, 'household_member_assessment.initial_symptoms') === 'yes';
        return userHasDangerSigns;
    },
    actions: [{form: 'cholera_follow_up', label:'Follow Up'}, {form: 'cholera_verification', label: 'Verify Case'}],
    events: [{
        start: 3,
        end: 3,
        dueDate: function(event, contact, report){
            return new Date(report.reported_date + (event.start * 24 * 60 * 60 * 1000));
        }
    }],
    priority: {level: 'high', label: 'High Priority'},
},
];