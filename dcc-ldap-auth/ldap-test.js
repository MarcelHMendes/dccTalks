const ldap = require('ldapjs');
const client = ldap.createClient({
    url: 'ldaps://ldap.dcc.ufmg.br:389'
});

//var opts = {
//    filter: '(email=rafaelguedes@dcc.ufmg.br)'
//};
//
//client.search('dc=dcc,dc=ufmg,dc=br', {}, function(err, res) {
//    assert.ifError(err);
//    res.on('searchEntry', function(entry) {
//        console.log('entry: ' + JSON.stringify(entry.object));
//    });
//    res.on('searchReference', function(referral) {
//        console.log('referral: ' + referral.uris.join());
//    });
//    res.on('error', function(err) {
//        console.error('error: ' + err.message);
//    });
//    res.on('end', function(result) {
//        console.log('status: ' + result.status);
//    });
//});
