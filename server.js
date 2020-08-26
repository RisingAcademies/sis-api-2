require('@babel/register');
/* eslint-disable no-console */
const cluster = require('cluster');
const os = require('os');
const chalk = require('chalk');
const app = require('./app');

if (cluster.isMaster && process.env.NODE_ENV === 'production') {
	const numWorkers = os.cpus().length;

	console.log(chalk.blue(`Master cluster setting up ${numWorkers} workers...`));

	for (let i = 0; i < numWorkers; i += 1) {
		cluster.fork();
	}

	cluster.on('online', (worker) => {
		console.log(chalk.blue(`Worker ${worker.process.pid} is online`));
	});

	cluster.on('exit', (worker, code, signal) => {
		console.log(
			chalk.blue(
				`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`,
			),
		);
		console.log(chalk.blue('Starting a new worker'));
		cluster.fork();
	});
} else {
	app.listen(process.env.PORT || 3000, () => {
		console.log(
			chalk.blue(`Process ${process.pid} is listening to all incoming requests`),
		);
	});
}
