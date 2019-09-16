import Component from '../../shared/Component/Component'

import './Header.scss'

class Header extends Component{
	constructor({element}) {
		super({element})

		this._render()

		this.on('click', '[data-element="Create Card"]', event => this._openModal(event))
	}

	_openModal(event) {
		event.preventDefault()
		this._trigger('openModal')
	}

	getElement() {
		return this._element.querySelector('[data-element="Create Card"]')
	}

	_render() {
		this._element.innerHTML = `
			<header class="header">
				<div class="header__logo">Logo Medical</div>
				<div class="header__button-creat">
					<a class="header__link" href="#" data-element="Create Card">
						<span class="header__glitch">Create Card</span>
					</a>
				</div>
			</header>
		`
	}
}

export default Header