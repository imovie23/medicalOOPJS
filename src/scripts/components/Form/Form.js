import {DOCTORS} from '../../constants'
import Component from '../../shared/Component/Component'
import Select from '../CustomSelect/CustomSelect'
import Cardiologist from '../Cardiologist'
import Dentist from '../Dentist'
import Therapist from '../Therapist'
import './Form.scss'

class Form extends Component{
	constructor({element}) {
		super({element})

		this._render()
		this._form = this._element.querySelector('[name="dataForm"]')

		this._initSelect()

		this.on('customSelect', event => this._optionSelected(event))
		this.on('submit', event => this._sendData(event))
	}

	_sendData(event) {
		event.preventDefault()
		const form = this._form

		const inputs = Array.from(form.elements).filter(elem => {
			return elem.dataset.element === 'form-input'
		})

		const formData = {}

		inputs.forEach((input) => {
			let key = input.name
			formData[key] = input.value.trim()
		})

		formData.position = this._visit.getPosition()
		formData.id = Math.random().toFixed(7).toString().slice(2)

		this._trigger('data', formData)
		form.reset()
	}

	_initSelect() {
		this._select = new Select({
			element: document.querySelector('[data-component="select"]'),
			doctors: DOCTORS,
		})
	}

	clearForm() {
		this._form.reset()
		this._select.clearSelect()
		this._visit && this._visit.removeFields()
	}

	_optionSelected(event) {
		this._initFormFields(event.detail)
	}

	_initFormFields(position) {
		const formFields = this._element.querySelector('[data-component="form-fields"]')

		switch (position) {
			case DOCTORS[0]:
				this._visit = new Cardiologist({
					element: formFields
				})
				this._visit.showFields(position)
				return
			case DOCTORS[1]:
				this._visit = new Dentist({
					element: formFields
				})
				this._visit.showFields(position)
				return
			case DOCTORS[2]:
				this._visit = new Therapist({
					element: formFields
				})
				this._visit.showFields(position)
				return
			default:
				this._visit = new Therapist({
					element: formFields
				})
				this._visit.showFields(position)
				return
		}
	}

	_render() {
		this._element.innerHTML = `
			<form class="data-form" name="dataForm">
				<div class="custom-select" data-component="select"></div>
				<div class="form-fields js-hidden" data-component="form-fields"></div>
			</form>
		`
	}
}

export default Form