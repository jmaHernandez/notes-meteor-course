import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import React from 'react';

import PropTypes from 'prop-types';

export const NoteListHeader = (props) => {
	return (
		<div>
			<p>
				<button onClick={ () => { props.meteorCall('notes.insert') }}>Create Note</button>
			</p>
		</div>
	);
};

NoteListHeader.propTypes = {
	meteorCall: PropTypes.func.isRequired
};

export default createContainer(() => {
	return {
		meteorCall: Meteor.call
	};
}, NoteListHeader);