import Component from '../Component/Component'
import './Visit.scss'

class Visit extends Component {
	constructor({element}) {
		super({element})
	}

	showFields(position) {
		this._position = position

		this._render()
		super.show()
	}

	removeFields() {
		this._element.innerHTML = ''
	}

	getPosition() {
		return this._position
	}

	static _renderNameInput() {
		return `
			<p class="user-data__wrap">
				<label for="name" class="user-data__label">Your full name:</label>
				<input id="name" name="name" class="user-data__input" required maxlength="40" data-element="form-input">
			</p>
		`
	}

	static _renderPurposeInput() {
		return `
			<p class="user-data__wrap">
				<label for="purpose" class="user-data__label">Purpose of the visit:</label>
				<input id="purpose" name="purpose" class="user-data__input" required maxlength="40" data-element="form-input">
			</p>
		`
	}

	static _renderInputDate() {
		return `
			<p class="user-data__wrap">
				<label for="date" class="user-data__label">Date of you visit:</label>
				<input id="date" type="date" name="date" class="user-data__input"  required data-element="form-input">
			</p>
		`
	}

	static _renderNote() {
		return `
			<p class="user-data__wrap">
				<label for="note" class="user-data__label">Additional Notes:</label>
				<textarea name="note" id="note" rows="3" maxlength="400" class="user-data__input user-data__input--note" data-element="form-input"></textarea>
		`
	}

	static _renderSubmit() {
		return `
			<p class="user-data__wrap">
				<button type="submit" name="createBtn" class="user-data__create" data-element="create">Create</button>
			</p>
		`
	}
}

export default Visit
