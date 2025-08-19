const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode : 'sandbox',
    client_id : 'AddqMSeSuyv--SJQlijV7bqGLDaUyJzxFnK8JQ6h7zprVudbojqYo8rlf4JR2bheHeJcHCHknbfZpIV7',
    client_secret : 'EJ9sUbJG7HyndIV0kZ4ge_kdsazxcqNotlt-_D3z1g6syFiYLbf38nJoH4uiChvQSKJ3HONRlbTOqs97',
});

module.exports = paypal;