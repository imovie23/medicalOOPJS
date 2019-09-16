import Component from '../../shared/Component/Component'
import Header from '../Header/Header'
import Board from '../../components/Board/Board'
import Modal from '../../components/Modal/Modal'
import Card from '../../components/Card/Card'
import './Page.scss'


class Page extends Component {
	constructor({element}) {
		super({element})

		this._render()

		this._initHeader()
		this._initBoard()
		this._initModal()

		this.on('data', event => this._getFormData(event))
	}

	_initHeader() {

		this._header = new Header({
			element: this._element.querySelector('[data-component="header"]')
		})

		this._header.on('openModal', () => {
			!this._modal && this._initModal()
			this._modal.show()

			document.addEventListener('click', event => this._onDocumentClickHideModal(event))
		})
	}

	_onDocumentClickHideModal(event) {
		const modal = this._modal.getElement()
		const createBtn = this._header.getElement()

		if (!createBtn.contains(event.target) && !modal.contains(event.target)) {
			this._modal.hide()
		}
	}

	_initBoard(card) {
		this._board = new Board({
			element: this._element.querySelector('[data-component="board"]'),
			card: card
		})
		this._initCards()
	}

	_initModal() {
		this._modal = new Modal({
			element: this._element.querySelector('[data-component="modal"]')
		})

		this._modal.on('close', () => {
			this._modal.hide()
		})
	}

	_initCards() {
		this._card = new Card({
			element: this._element.querySelector('[data-component="cards"]')
		})

		this._card._DataStorage()
		if (Object.keys(this._card._oJson).length === 0) {
			localStorage.clear()
			this._card._render()

		} else {
			this._card.renderElement()
			this._card.getLocaleStorageCss()

		}
	}

	_getFormData(event) {
		this._modal.hide()
		this._card.addData(event.detail)


		if (event) {
			this._card._DataStorage()
			this._card.renderElement()

		}
	}

	_render() {
		this._element.innerHTML = `
			<div class="header-wrap" data-component="header"></div>
	
			<main class="main">
				<div data-component="board">
				</div></div>

				<div class="page__base-line">
					<div class="page__line page__line--first"></div>
					<div class="page__line page__line--second"></div>
					<div class="page__line page__line--third"></div>
					<div class="page__line page__line--fours"></div>
					<div class="page__line page__line--fives"></div>
				</div>
	
				<div class="modal-wrap js-hidden" data-component="modal"></div>
			</main>
		`
	}
}

export default Page