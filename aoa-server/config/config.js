
module.exports = {
    environment: 'dev', //开发环境dev  生产环境 prod
    database: {
        dbName: 'hgf_data',
        host: 'localhost',
        port: '1019',
        user: 'root',
        password: '19941019',
    },
    security: {
        secretKey: 'huangguofei', //key
        expiresIn: 60*60 ,//令牌过期时间
    }
}
