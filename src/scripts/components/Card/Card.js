import Component from '../../shared/Component/Component'
import {HIDDEN_CLASS} from "../../constants";
import './Card.scss'
import DragDrop from '../../components/Drag-n-Drop/Drag-n-Drop'

class Card extends Component {
    constructor({element}) {
        super({element});
        this._obj = {}
        this._oJson = {}
        this._cssJson = {}
        this._render()
        this.on('mousedown', '[data-element="card-items"]', event => this.getDragNDrop(event))
        this.on('mouseup', '[data-element="card-items"]', event => this.toLocalStorageCss(event))
        this._initDragNDrop()


    }

    addData(data = {}) {
        this.getLocaleStorageCss()
        this._obj[`${data.id}`.trim()] = data;
        this._creatStorage();

    }

    _creatStorage(elem) {
        if (elem !== undefined) {
            this._obj = elem
        }
        let test = this._obj;
        for (let i in test) {
            let test = this._obj
            for (let i in test) {
                localStorage.setItem(i, JSON.stringify(test[i]))
            }

        }


    }

    _DataStorage() {
        let sKey;
        for (let i = 0; sKey = window.localStorage.key(i); i++) {
            if (sKey !== "loglevel:webpack-dev-server" && !sKey.includes('css') && sKey !== 'undefined') {
                this._oJson[sKey] = JSON.parse(window.localStorage.getItem(sKey));
            }
        }

    }


    _initDragNDrop(event) {
        this._dragDrop = new DragDrop({
            element: this._element.querySelector('[data-component="drag-drop"]'),
            event: event
        })

    }


    getDragNDrop(event) {

        if (event.target.dataset.element === 'remove-card') {
            localStorage.removeItem(event.target.dataset.personId)
            delete this._oJson[event.target.dataset.personId];
            this._creatStorage(this._oJson);
            if (Object.keys(this._oJson).length === 0) {
                this._render()
            } else {
                this.renderElement()
                this.getLocaleStorageCss()

            }

        } else if (event.target.dataset.element === 'show-more') {
            event.target.nextElementSibling.classList.toggle((HIDDEN_CLASS));

        } else {

            this._dragDrop.selectElement(event.delegateTarget, event)
        }

        event.preventDefault();

    }

    toLocalStorageCss(event) {
        localStorage.setItem(event.target.dataset.id, JSON.stringify(event.target.style.cssText))
    }


    getLocaleStorageCss() {
        let sKey;
        for (let i = 0; sKey = window.localStorage.key(i); i++) {

            if (sKey.includes('css')) {
                this._cssJson[sKey] = JSON.parse(window.localStorage.getItem(sKey));
            }
        }

        let itemCard = document.querySelector('.cards-list')

        if (itemCard) {
            for (let i of itemCard.childNodes) {

                if (i.dataset) {
                    Object.entries(this._cssJson).map(([key, value]) => {
                        if (i.dataset.id === key) {
                            i.style.cssText = value;

                        }

                    })
                }
            }
        }
    }

    renderElement() {

        this._element.innerHTML = `
			<div class="card">
				<div class="cards-list">
					${Object.values(this._oJson).map(data => `
             
						<div class="cards-list__card" data-element="card-items" data-id="${
            Object.entries(data).map(([key, value]) => {
                if (key === 'id') {
                    return value + '-css';
                }
            }).join('')}">
							<div class="btn-wrap"><button class="delete-card" data-element="remove-card" data-person-id=${data.id}>x</button></div>
							${Object.entries(data).map(([key, value]) => {
            if (key === 'name' || key === 'position')
                return `<p class="main-info"><span class="main-info__key">${key} :  </span><span class="main-info__values">${value}</span> </p>`
        }).join('')}
							
							<button type="button" class="show-more" data-element="show-more">Show more</button>
							
							<div class="additional-info js-hidden">
								${Object.entries(data).map(([key, value]) => {
                if (key !== 'name' && key !== 'position' && value !== '' && key !== 'id') {
                    return `<div class="additional-info__item"><span class="additional-info__item-key">${key} :  </span><span class="main-info__values">${value}</span> </div>`
                } else if (key === 'id') {
                    return `<div class="additional-info__item-id"><span class="additional-info__item-key">${key} :  </span ><span class="main-info__values">${value}</span> </div>`
                }
            }
        ).join('')}
							</div>	
						</div>
						`).join('')}
				</div>
			</div>
		`
        this.getLocaleStorageCss()
    }


    _render() {
        this._element.innerHTML = `<div class="cards" data-component="cards">
<div class="board__default-txt">No items have been added</div>
</div>`
    }
}


export default Card

