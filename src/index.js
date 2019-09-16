import './scripts/app'

import './css/index.css'
import './scss/index.scss'

// hot module replacement
if (module && module.hot) {
	module.hot.accept();

	module.hot.dispose(function() {

	})

}