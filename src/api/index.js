const { Router } = require('express');
const pyme = require('./routes/pyme');
const qr = require('./routes/qr');


// guaranteed to Get dependencies
module.exports = () => {
	const app = Router();
	pyme(app);
	qr(app);


	return app
}