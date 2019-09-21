var ldap = require('ldapjs');
var client = ldap.createClient({
    url: 'ldaps://ldap.dcc.ufmg.br:636'
});
