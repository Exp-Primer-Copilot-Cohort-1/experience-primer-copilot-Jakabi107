/**
 * Creates an HTTP server that performs arithmetic operations based on the query parameters.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    /**
     * @typedef {Object} QueryObject
     * @property {number} num1 - The first number.
     * @property {number} num2 - The second number.
     * @property {string} op - The arithmetic operation.
     */

    /**
     * Parses the query parameters from the request URL.
     * @param {string} url - The request URL.
     * @returns {QueryObject} The parsed query parameters.
     */
    function parseQueryParams(url) {
        return url.parse(url, true).query;
    }

    /**
     * Performs arithmetic operations based on the query parameters.
     * @param {QueryObject} queryObject - The query parameters.
     * @returns {number|string} The result of the arithmetic operation.
     */
    function performArithmeticOperation(queryObject) {
        const { num1, num2, op } = queryObject;
        let result;
        switch (op) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            default:
                result = 'Invalid operation';
        }
        return result;
    }

    const queryObject = parseQueryParams(req.url);
    const result = performArithmeticOperation(queryObject);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Result: ${result}`);
});

server.listen(3000, 'localhost', () => {
    console.log('Server running at http://localhost:3000/');
});
