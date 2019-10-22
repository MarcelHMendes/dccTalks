const { Client } = require('ldapts');

const username = '';
const password = '';

const url = 'ldap://ldap.dcc.ufmg.br';
const bindDN = `uid=${username},ou=People,dc=dcc,dc=ufmg,dc=br`;
const searchDN = 'ou=People,dc=dcc,dc=ufmg,dc=br';

const client = new Client({
    url,
    tlsOptions: {
        requestCert: false
    },
});

async function auth() {
    try {
        await client.bind(bindDN, password);

        const {
            searchEntries,
            searchReferences,
        } = await client.search(searchDN, {
            scope: 'sub',
            filter: `(uid=${username})`,
        });

        console.log(searchEntries);
        console.log(searchReferences);

        await client.unbind();

    } catch (ex) {
        throw ex;
    }
}

auth();
