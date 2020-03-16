const { Router } = require('express');
const pyme = require('./routes/pyme');

// guaranteed to Get dependencies
module.exports = () => {
	const app = Router();
	pyme(app);

	return app
}