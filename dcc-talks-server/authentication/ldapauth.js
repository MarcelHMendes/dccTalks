const ldapAuthenticate = async (username, password) => {
    const bindDN = `uid=${username},ou=People,dc=dcc,dc=ufmg,dc=br`
    try {
        await client.bind(bindDN, password)
        await client.unbind()
        return true
    } catch (ex) {
        return false
    }
}

module.exports.authenticate = ldapAuthenticate;
