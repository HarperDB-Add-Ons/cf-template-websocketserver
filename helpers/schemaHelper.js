export const ensureSchema = async ({ hdbCore, logger }, schema, table) => {
	// ensure schema exists
	logger.notify('Creating schema..');
	try {
		await hdbCore.requestWithoutAuthentication({
			body: {
				operation: 'create_schema',
				schema,
			},
		});
		logger.notify('Schema created.');
	} catch (error) {
		console.log('error.message', error.message);
		logger.notify('Schema alread exists.');
	}

	// ensure table exists
	logger.notify('Creating table..');
	try {
		await hdbCore.requestWithoutAuthentication({
			body: {
				operation: 'create_table',
				schema,
				table,
				hash_attribute: 'id',
			},
		});
		logger.notify('Table created.');
	} catch (error) {
		console.log('error.message', error.message);
		logger.notify('Table already exists.');
	}
};
