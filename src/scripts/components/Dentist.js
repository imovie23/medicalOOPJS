import Visit from '../shared/Visit/Visit'

class Dentist extends Visit{
	constructor({element}) {
		super({element})

		this._render()
	}

	_render() {
		this._element.innerHTML = `
			<div class="user-data">
				${Dentist._renderNameInput()}
				${Dentist._renderPurposeInput()}
				${Dentist._renderInputDate()}
				${Dentist._renderNote()}
				${Dentist._renderSubmit()}
			</div>
		`
	}
}

export default Dentist