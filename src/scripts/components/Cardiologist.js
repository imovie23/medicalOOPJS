import Visit from '../shared/Visit/Visit'

class Cardiologist extends Visit{
	constructor({element}) {
		super({element})

		this._render()
	}

	static _renderPressureInput() {
		return `
			<p class="user-data__wrap">
				<label for="pressure" class="user-data__label">Your normal pressure:</label>
				<input id="pressure" name="pressure" class="user-data__input"  maxlength="40" data-element="form-input">
			</p>
		`
	}

	static _renderWeightInput() {
		return `
			<p class="user-data__wrap">
				<label for="weight" class="user-data__label">Your body weight index:</label>
				<input id="weight" name="weight" class="user-data__input"  maxlength="40" data-element="form-input">
			</p>
		`
	}

	static _renderPastDiseasesInput() {
		return `
			<p class="user-data__wrap">
				<label for="pastDiseases" class="user-data__label">Your past diseases of the cardiovascular system:</label>
				<input id="pastDiseases" name="past-diseases" class="user-data__input"  maxlength="40" data-element="form-input">
			</p>
		`
	}

	static _renderAgeInput() {
		return `
			<p class="user-data__wrap">
				<label for="age" class="user-data__label">Your age:</label>
				<input id="age" name="age" class="user-data__input"  required  maxlength="40" data-element="form-input">
			</p>
		`
	}

	_render() {
		this._element.innerHTML = `
			<div class="user-data">
				${Cardiologist._renderNameInput()}
				${Cardiologist._renderAgeInput()}
				${Cardiologist._renderPurposeInput()}
				${Cardiologist._renderPressureInput()}
				${Cardiologist._renderWeightInput()}
				${Cardiologist._renderPastDiseasesInput()}
				${Cardiologist._renderNote()}
				${Cardiologist._renderSubmit()}
			</div>
		`
	}
}

export default Cardiologist