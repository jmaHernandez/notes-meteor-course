import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import React from 'react';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';

import PropTypes from 'prop-types'; 

export class Editor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			body: ''
		};
	}

	componentDidUpdate(prevProps, prevState) {
		const currentNoteId = this.props.note ? this.props.note._id : undefined;
		const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

		if (currentNoteId && currentNoteId !== prevNoteId) {
			this.setState({
				title: this.props.note.title,
				body: this.props.note.body
			});
		}
	}

	handleTitleChange(e) {
		const title = e.target.value;

		this.setState({ title });
		this.props.call('notes.update', this.props.note._id, { title });
	}

	handleBodyChange(e) {
		const body = e.target.value;

		this.setState({ body });
		this.props.call('notes.update', this.props.note._id, { body });
	}

	handleRemoval(e) {
		this.props.call('notes.remove', this.props.note._id);

		this.props.browserHistory.push('/dashboard');
	}

	render() {
		if (this.props.note) {
			return (
				<div className="editor">
					<input className="editor__title" value={ this.state.title } placeholder="Untitled Note" onChange={ this.handleTitleChange.bind(this) }/>
					<textarea className="editor__body" value={ this.state.body } placeholder="Your note here" onChange={ this.handleBodyChange.bind(this) }></textarea>
					<button className="button button--danger" onClick={ this.handleRemoval.bind(this) }>Delete Note</button>
				</div>
			);
		} else {
			return (
				<div className="editor">
					<p className="editor__message">
						{ this.props.selectedNoteId ? 'Note not found' : 'Pick or create a note to get started' }
					</p>
				</div>
			);
		}
	}
}

Editor.propTypes = {
	selectedNoteId: PropTypes.string,
	note: PropTypes.object,
	call: PropTypes.func.isRequired,
	browserHistory: PropTypes.object.isRequired
};

export default createContainer(() => {
	const selectedNoteId = Session.get('selectedNoteId');

	return {
		selectedNoteId,
		note: Notes.findOne(selectedNoteId),
		call: Meteor.call,
		browserHistory
	};
}, Editor);