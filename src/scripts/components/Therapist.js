import Visit from '../shared/Visit/Visit'

class Therapist extends Visit{
	constructor({element}) {
		super({element})

		this._render()
	}

	static _renderAgeInput() {
		return `
			<p class="user-data__wrap">
				<label for="age" class="user-data__label">Your age:</label>
				<input id="age" name="age" class="user-data__input" required  maxlength="40" data-element="form-input">
			</p>
		`
	}

	_render() {
		this._element.innerHTML = `
			<div class="user-data">
				${Therapist._renderNameInput()}
				${Therapist._renderAgeInput()}
				${Therapist._renderPurposeInput()}
				${Therapist._renderNote()}
				${Therapist._renderSubmit()}
			</div>
		`
	}
}

export default Therapist