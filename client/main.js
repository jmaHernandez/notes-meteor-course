import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import ReactDOM from 'react-dom';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
	onAuthChange(!!Meteor.userId());
});

Meteor.startup(() => {
	ReactDOM.render(routes, document.getElementById('app'));
});