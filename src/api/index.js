const { Router } = require('express');
const pyme = require('./routes/pyme');
const qr = require('./routes/qr');
const tcma = require('./routes/tcma');



// guaranteed to Get dependencies
module.exports = () => {
	const app = Router();
	pyme(app);
	qr(app);
	tcma(app);


	return app
}