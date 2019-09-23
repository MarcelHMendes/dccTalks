const LdapClient = require('ldapjs-client');

const tlsOptions = {
    requestCert: false,
    rejectUnauthorized: false
};

const client = new LdapClient({
    tlsOptions: tlsOptions,
    url: 'ldaps://ldap.dcc.ufmg.br:389',
});
