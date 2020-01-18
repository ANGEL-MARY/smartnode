const request = require('request')

const VERSION = '0.1'

const phoneVerification = ({ apiKey }) => {
    const props = {
        apiKey,
        apiURL: 'https://api.authy.com',
        headers: {
            'User-Agent': `StudyWise/${VERSION} (node ${process.version})`,
        },
    }

    const verificationRequest = (type, path, params, callback, qS) => {
        const qs = qS || {}
        qs.api_key = props.apiKey

        const options = {
            url: props.apiURL + path,
            form: params,
            headers: props.headers,
            qs,
            json: true,
            jar: false,
            strictSSL: true,
        }

        const callbackCheck = (err, res, body) => {
            if (!err) {
                if (res.statusCode === 200) {
                    callback(null, body)
                } else {
                    callback(body)
                }
            } else {
                callback(err)
            }
        }

        switch (type) {
            case 'post':
                request.post(options, callbackCheck)
                break
            case 'get':
                request.get(options, callbackCheck)
                break
            default:
                break
        }
    }

    const requestToken = (phone, via, countryCode = 91, callback) => {
        verificationRequest(
            'post',
            '/protected/json/phones/verification/start',
            {
                api_key: props.apiKey,
                phone_number: phone,
                via: via || 'sms',
                country_code: countryCode,
                code_length: 4,
                locale: 'en',
            },
            callback,
        )
    }

    const verifyToken = (phone, token, countryCode = 91, callback) => {
        verificationRequest(
            'get',
            '/protected/json/phones/verification/check',
            {
                api_key: props.apiKey,
                verification_code: token,
                phone_number: phone,
                country_code: countryCode,
            },
            callback,
        )
    }

    return Object.freeze({
        requestToken,
        verifyToken,
    })
}

module.exports = phoneVerification
