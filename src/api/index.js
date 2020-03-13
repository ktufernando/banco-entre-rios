const { Router } = require('express');
const pyme = require('./routes/pyme');

// guaranteed to get dependencies
module.exports = () => {
	const app = Router();
	pyme(app);

	return app
}