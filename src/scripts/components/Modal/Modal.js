import Component from '../../shared/Component/Component'
import Form from '../Form/Form'
import './Modal.scss'

class Modal extends Component{
	constructor({element}) {
		super({element})

		this._render()

		this._initialForm()

		this.on('click', '[data-element="close"]', event => this._closeModal(event))
	}

	_closeModal() {
		this._trigger('close')
	}

	_initialForm() {
		this._form = new Form({
			element: document.querySelector('[data-component="form"]')
		})
	}

	hide() {
		this._form.clearForm()
		super.hide()
	}

	_render() {
		this._element.innerHTML = `
			<div id="modal" class="modal" data-element="modal">
				<div class="modal__header">
					<button type="button" class="modal__close" data-element="close">x</button>
				</div>
				<div class="modal__body">
					<div data-component="form"></div>
					
				</div>
			</div>	
		`
	}
}

export default Modal