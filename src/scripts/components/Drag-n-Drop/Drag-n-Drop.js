import Component from "../../shared/Component/Component";


class DragDrop extends Component {
    constructor(element) {
        super({element})
        this._element = element;

    }


    selectElement(target, event) {
        this._element = target
        this._selectCurrentItem(event)

    }

    _selectCurrentItem(event) {

        let shiftX = event.clientX - this._element.getBoundingClientRect().left;
        let shiftY = event.clientY - this._element.getBoundingClientRect().top;

        this._element.setAttribute('ondragstart', 'false')


        this._element.style.position = 'absolute';

        this._moveAt(event, shiftX, shiftY)
        this._element.style.zIndex = 90;

        this.on('mousemove'), event => this._moveAt(event, shiftX, shiftY)


        document.onmousemove = event => this._moveAt(event, shiftX, shiftY);
        document.onmouseup = function () {
            document.onmousemove = null;
            this.onmouseup = null;
        }

    }


    _moveAt(e, shiftX, shiftY) {
        let limits = this._getCoords(this._element);


        let newLocation = {
            x: limits.left,
            y: limits.top
        };


        if (e.pageX - shiftX > limits.right) {
            newLocation.x = limits.right;
        } else if (e.pageX - shiftX > limits.left) {
            newLocation.x = e.pageX - shiftX;
        }
        if (e.pageY - shiftY > limits.bottom) {
            newLocation.y = limits.bottom;
        } else if (e.pageY - shiftY > limits.top) {
            newLocation.y = e.pageY - shiftY;
        }

        this._relocate(newLocation)

    }

    _relocate(newLocation) {

        this._element.style.left = newLocation.x + 'px';
        this._element.style.top = newLocation.y + 'px';

    }


    _getCoords() {
        let board = document.querySelector('.board')

        return {
            top: board.offsetTop,
            right: board.offsetWidth + board.offsetLeft - this._element.offsetWidth,
            bottom: board.offsetHeight + board.offsetTop - this._element.offsetHeight,
            left: board.offsetLeft
        };


    }


}


export default DragDrop