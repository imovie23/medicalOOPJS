import Component from '../../shared/Component/Component'
import './CustomSelect.scss'

class CustomSelect extends Component{
	constructor({element, doctors}) {
		super({element})
		this._doctors = doctors
		this._isOpen = false

		this.on('click', event => this._onSelectClick(event))

		this._render()
	}

	_toggle() {
		if (this._isOpen) this._close()
		else this._open()
	}

	_open() {
		this._element.classList.add('open')
		document.addEventListener('click', event => this._onDocumentClick(event))
		this._isOpen = true
	}

	_close() {
		this._element.classList.remove('open')
		document.removeEventListener('click', this._onDocumentClick)
		this._isOpen = false
	}

	_onDocumentClick(event) {
		if (!this._element.contains(event.target)) this._close();
	}

	_setValue(title) {
		this._element.querySelector('[data-elem="select-btn"]').innerHTML = title
		this._close()
	}

	_onSelectClick(event) {
		if (event.target.closest('[data-elem="select-btn"]')) {
			this._toggle()
		} else if(event.target.tagName === 'LI') {
			this._setValue(event.target.innerHTML)

			this._trigger('customSelect', event.target.dataset.elem)
		}
	}

	clearSelect() {
		this._setValue('Choose doctor')
	}

	_render() {
		this._element.innerHTML = `
			<button type="button" class="custom-select__title" data-elem="select-btn">Choose doctor</button>
			<ul	class="select-doctors">
				${this._doctors.map(doctor => `
					<li class="select-doctors__item" data-elem="${doctor}">
						${doctor}
					</li>
				`).join('')}
			</ul>
		`
	}
}

export default CustomSelect