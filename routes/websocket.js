import { ensureSchema } from '../helpers/schemaHelper.js';
import { startWSServer } from '../helpers/websocketHelper.js';

const schema = 'hdb_one';
const table = 'messages';

export default async (server, { hdbCore, logger }) => {
	// create schema and table
	await ensureSchema({ hdbCore, logger }, schema, table);

	// only run in one instance of a CF server
	if (process.env.NODE_APP_INSTANCE === '0') {
		startWSServer({ hdbCore, logger }, schema, table);
	}

	server.route({
		url: '/healthCheck',
		method: 'GET',
		handler: () => {
			return 'The CF Server is running.';
		},
	});
};
