import Component from '../../shared/Component/Component'
import './Board.scss'
class Board extends Component {
    constructor({element}) {
        super({element})
        this._render()

    }


    _render() {
        this._element.innerHTML = `
			<div class="board">
				<div class="cards" data-component="cards">
					<div class="board__base-line">
					<div class="board__table-line-one"></div>
					<div class="board__table-line-two"></div>
				</div>
			</div>
		`
    }
}

export default Board