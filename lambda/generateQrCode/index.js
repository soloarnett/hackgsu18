const AWS = require('aws-sdk')
const crypto = require("crypto")
exports.handler = async (event) => {
    // TODO implement
    return await generateUniqueId()
}

function generateQrCode(id) {
    const QRCode = require('qrcode')
    
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(id, function (err, url) {
            if (err) {
                console.log('err', err)
                reject(err)
            } else {
                console.log('url', url)
                resolve(parsedBase64String(url))
            }
        })
    })
}

function parsedBase64String(base64) {
    return base64.substring(base64.indexOf(',') + 1)
}

function generateUniqueId() {
    let id = crypto.randomBytes(16).toString("hex")
    // let verification = crypto.randomBytes(16).toString("hex")
    let getParams = {
        TableName: "HackGSU_qrCodes",
        Key: {
            id: id
        }
    }

    let getId = docClient.get(getParams).promise()

    getId.then((data) => {
        // count protects against ddos
        if (data.Item && count < 10) {
            count += 1;
            generateUniqueId()
        } else if (count >= 10) {
            return ("There was an error generating a unique id for this request. Please see documentation.")
        } else {
            return await generateQrCode(id)
        }
    })
}